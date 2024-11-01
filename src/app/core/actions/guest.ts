'use server'
import core from '@architecturex/utils.core'
import { cookies } from 'next/headers'

import { APIResponse } from '~/types'
import GuestService from '~/app/core/services/guest'
import * as UserActions from '~/app/core/actions/user'

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
    photo
  })

  return response
}

export const getAll = async (): Promise<APIResponse<any>> => {
  const cookieStore = await cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const response = await GuestService.getAll({ businessId: connectedUser?.businessId || '' })
  return {
    ...response,
    connectedUser
  }
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
    photo
  })

  return response
}
