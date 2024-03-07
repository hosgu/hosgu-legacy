import core from '@architecturex/utils.core'
import { ReservationFields } from '~/server/db/schemas/reservation'
import ReservationService from '~/app/shared/services/reservation'

export async function getReservationById(id: ReservationFields['id']) {
  const response = await ReservationService.getOne({ id })
  return response
}

export async function getAllReservations() {
  const response = await ReservationService.getAll()
  return response
}

export async function createReservation(e: FormData) {
  const payload = core.formData.get(e) as any
  const response = await ReservationService.create(payload)
  return response
}

export async function getReservationsByGuestId(id: ReservationFields['guestId']) {
  const response = await ReservationService.getAll(`reservation/guest/${id}`)
  return response
}
