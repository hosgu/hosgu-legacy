import core from '@architecturex/utils.core'
import { ReservationFields } from '~/server/db/schemas/reservation'
// import {
//   createReservation,
//   getReservationById,
//   getAllReservations,
//   getReservationsByGuestId
// } from '~/app/shared/services/reservations'
import ReservationServices from '~/app/shared/services/reservations'

export async function getReservationBy(query: any) {
  if (query.id) {
    return getReservationById(query.id)
  }

  if (query.guestId) {
    return getReservationsByGuestId(query.guestId)
  }
}

export async function getReservationById(id: ReservationFields['id']) {
  const response = await ReservationServices.getReservationById(id)
  return response
}

// export async function getAllReservations() {
//   const response = await getAllReservations()
//   return response
// }

// export async function createReservation(e: FormData) {
//   const payload = core.formData.get(e) as any
//   const response = await createReservation(payload)
//   return response
// }

// export async function getReservationsByGuestId(id: ReservationFields['guestId']) {
//   const response = await getReservationsByGuestId(id)
//   return response
// }
