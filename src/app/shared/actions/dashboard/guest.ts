'use server'
import core from '@architecturex/utils.core'
import { APIResponse } from '~/types'
import DashboardGuestService from '~/app/shared/services/guest'

export const getAllGuests = async (): Promise<APIResponse<any>> => {
  const response = await DashboardGuestService.getAll()

  return response
}

export const createGuest = async (e: FormData): Promise<APIResponse<any>> => {
  const {
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  } = core.formData.get(e)

  const response = await DashboardGuestService.create({
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  })

  return response
}

export const deleteGuest = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await DashboardGuestService.delete(id)

  return response
}

export const getOneGuest = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await DashboardGuestService.getOne({ id })

  return response
}

export const editGuest = async (e: FormData): Promise<APIResponse<any>> => {
  const {
    id,
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  } = core.formData.get(e)

  const response = await DashboardGuestService.update(id, {
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  })

  return response
}
