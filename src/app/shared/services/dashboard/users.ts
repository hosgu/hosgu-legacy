import api from '@architecturex/utils.api'

import { UserFields } from '~/server/db/schemas/user'
import { APIResponse, CreatedItem } from '~/types'

export const getAll = async () => {
  const response = await api.fetch<APIResponse<UserFields>>('/api/v1/user', {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return {
    ok: true,
    data: response,
    status: 200
  }
}
