'use server'
import core from '@architecturex/utils.core'
import { APIResponse } from '~/types'
import { create, getAll } from '../../services/dashboard/guest'

export const getAllGuestsServerAction = async (): Promise<APIResponse<any>> => {
  const response = await getAll()
  return response
}


export const createGuestServerAction = async (e: FormData): Promise<APIResponse<any>> => {
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

  const response = await create({
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
