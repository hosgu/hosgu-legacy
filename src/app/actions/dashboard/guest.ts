'use server'
import core from '@architecturex/utils.core'
import { APIResponse } from '~/types'
import { create, getAll, deleteRow, edit, getOne } from '../../services/dashboard/guest'

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

export const deleteGuestServerAction = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await deleteRow(id)

  return response
}

export const getOneGuestServerAction = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await getOne(id)

  return response
}

export const editServerAction = async (e: FormData): Promise<APIResponse<any>> => {
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

  const response = await edit({
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
  })

  return response
}
