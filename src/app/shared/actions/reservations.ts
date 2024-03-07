import core from '@architecturex/utils.core'
import { ReservationFields } from '~/server/db/schemas/reservation'
import ReservationService from '~/app/shared/services/reservation'

export const create = async (e: FormData) => {
  const payload = core.formData.get(e) as any
  const response = await ReservationService.create(payload)
  return response
}

export const getAll = async () => {
  const response = await ReservationService.getAll()
  return response
}

export const getOne = async (id: ReservationFields['id']) => {
  const response = await ReservationService.getOne({ id })
  return response
}

export const getOneByGuestId = async (id: ReservationFields['guestId']) => {
  const response = await ReservationService.getAll(`reservation/guest/${id}`)
  return response
}
