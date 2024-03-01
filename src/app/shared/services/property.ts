import api from '@architecturex/utils.api'
import { PropertyFields } from '~/server/db/schemas/property'
import { APIResponse } from '~/types'

export async function getPropertyById(id: string) {
  const response = api.fetch<APIResponse<PropertyFields>>(`/api/v1/property/${id}`, {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return response
}
