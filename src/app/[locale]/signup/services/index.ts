import api from '@architecturex/utils.api'

import { APIResponse, CreatedItem } from '~/types'

export const signup = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<APIResponse<CreatedItem>> => {
  const response = await api.fetch<APIResponse<CreatedItem>>('/api/v1/user/create', {
    method: 'POST',
    body: {
      email,
      password
    },
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return response
}
