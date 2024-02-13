import api from '@architecturex/utils.api'
import { UserFields } from '~/server/db/schemas/user'
import { APIResponse } from '~/types'

type User = UserFields & {
  businessId: string
}

export const getConnectedUser = async (at: any): Promise<User> => {
  const response = await api.fetch<APIResponse<any>>('/api/v1/user/validate', {
    method: 'POST',
    fields: [
      'tier',
      'role',
      'fullName',
      'phone',
      'avatar',
      'birthday',
      'website',
      'email',
      'active'
    ],
    credentials: 'include',
    addLocalHost: process.env.NODE_ENV === 'development',
    body: {
      at
    }
  })

  const [connectedUser] = response.items || []

  return connectedUser
}

export const getUserByCode = async (code: string): Promise<UserFields> => {
  const response = await api.fetch<APIResponse<UserFields>>(`/api/v1/user/code/${code}`, {
    method: 'GET',
    fields: [
      'tier',
      'role',
      'fullName',
      'phone',
      'avatar',
      'birthday',
      'website',
      'email',
      'active'
    ],
    credentials: 'include',
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  const [user] = response.items || []

  return user
}
