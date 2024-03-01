import api from '@architecturex/utils.api'
import { EstateFields } from '~/server/db/schemas/estate'
import { APIResponse } from '~/types'

export async function getAllEstates() {
  const response = await api.fetch('/api/v1/estate', {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return response
}

export async function getEstateById(id: string) {
  const response = await api.fetch<APIResponse<EstateFields>>(`/api/v1/estate/${id}`, {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return response
}
