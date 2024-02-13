import api from '@architecturex/utils.api'
import { BusinessFields } from '~/server/db/schemas/business'

import { APIResponse } from '~/types'

export const getBusiness = async (userId: string): Promise<BusinessFields[]> => {
  const response = await api.fetch<APIResponse<BusinessFields>>(`/api/v1/business/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  const business = response.items || []

  return business
}
