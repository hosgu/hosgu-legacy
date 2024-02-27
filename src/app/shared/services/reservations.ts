import api from '@architecturex/utils.api'
import { APIResponse, CreatedItem } from '~/types'
import { ReservationFields } from '~/server/db/schemas/reservation'

export async function getReservationById(id: ReservationFields['id']) {
  const response = await api.fetch<APIResponse<ReservationFields[]>>(`/api/v1/reservation/${id}`, {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return response
}

export async function getAllReservations() {
  const response = await api.fetch<APIResponse<ReservationFields[]>>('/api/v1/reservation')
  return response
}

export async function createReservation(payload: any) {
  const response = await api.fetch<APIResponse<CreatedItem>>('/api/v1/reservation/create', {
    method: 'POST',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return response
}

export async function getReservationsByGuestId(id: ReservationFields['guestId']) {
  const response = await api.fetch<APIResponse<ReservationFields[]>>(
    `/api/v1/reservation/guest/${id}`,
    {
      method: 'GET',
      addLocalHost: process.env.NODE_ENV === 'development'
    }
  )
  return response
}
