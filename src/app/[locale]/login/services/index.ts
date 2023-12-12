import api from '@architecturex/utils.api'
import { cookies } from 'next/headers'

import { APIResponse, Token } from '~/types'

export const login = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<APIResponse<Token>> => {
  const cookiesStore = cookies()

  const response = await api.fetch<APIResponse<Token>>('/api/v1/user/login', {
    method: 'POST',
    body: { emailOrUsername: email, password },
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  if (response.ok) {
    const [{ token = '' }] = response.items || []

    cookiesStore.set({
      name: 'at',
      value: token,
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    })
  }

  return response
}
