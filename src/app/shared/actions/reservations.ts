import core from '@architecturex/utils.core'
import { ReservationFields } from '~/server/db/schemas/reservation'
import {
  createReservation,
  getReservationById,
  getAllReservations,
  getReservationsByGuestId
} from '~/app/shared/services/reservations'

export async function getReservationByIdSeverAction(id: ReservationFields['id']) {
  const response = await getReservationById(id)
  return response
}

export async function getAllReservationsServerAction() {
  const response = await getAllReservations()
  return response
}

export async function createReservationServerAction(e: FormData) {
  const payload = core.formData.get(e) as any
  const response = await createReservation(payload)
  return response
}

export async function getReservationsByGuestIdServerAction(id: ReservationFields['guestId']) {
  const response = await getReservationsByGuestId(id)
  return response
}
