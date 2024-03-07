'use server'
import core from '@architecturex/utils.core'
import { APIResponse } from '~/types'
import GuestService from '~/app/shared/services/guest'

export const create = async (e: FormData): Promise<APIResponse<any>> => {
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

  const response = await GuestService.create({
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

export const getAll = async (): Promise<APIResponse<any>> => {
  const response = await GuestService.getAll()

  return response
}

export const getOne = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)
  const response = await GuestService.getOne({ id })
  return response
}

export const del = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await GuestService.delete(id)

  return response
}

export const update = async (e: FormData): Promise<APIResponse<any>> => {
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

  const response = await GuestService.update(id, {
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
