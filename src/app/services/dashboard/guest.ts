import api from '@architecturex/utils.api'

import { GuestFields } from '~/server/db/schemas/guest'
import { APIResponse, CreatedItem } from '~/types'

type CreateGuestPayload = {
  businessId: string
  fullName: string
  email: string
  phone: string
  website: string
  facebook: string
  instagram: string
  gender: string
  birthday: string
  organization: string
  taxIdentifier: string
  notes: string
  photo: string
}

type EditGuestPayload = CreateGuestPayload & {
  id: string
}

export const getAll = async () => {
  const response = await api.fetch<APIResponse<GuestFields>>('/api/v1/guest', {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return {
    ok: true,
    data: response,
    status: 200
  }
}

export const create = async ({
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
}: CreateGuestPayload): Promise<APIResponse<CreatedItem>> => {
  const body = {
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
  }

  const createdGuest = await api.fetch<APIResponse<GuestFields>>('/api/v1/guest/create', {
    method: 'POST',
    body,
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  if (createdGuest.status === 201) {
    return {
      ok: true,
      data: body,
      status: 200
    }
  }

  return {
    ok: false,
    error: {
      code: 'ERROR_CREATING_GUEST',
      message: 'Error creating guest'
    },
    status: 500
  }
}
export const deleteRow = async (id: string) => {
  const response = await api.fetch<APIResponse<GuestFields>>(`/api/v1/guest/${id}`, {
    method: 'DELETE',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return {
    ok: true,
    data: response,
    status: 200
  }
}

export const getOne = async (id: string) => {
  const response = await api.fetch<APIResponse<GuestFields>>(`/api/v1/guest/${id}`, {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })
  return {
    ok: true,
    data: response,
    status: 200
  }
}

export const edit = async ({
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
}: EditGuestPayload): Promise<APIResponse<CreatedItem>> => {
  const body = {
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
  }
  const editedGuest = await api.fetch<APIResponse<GuestFields>>(`/api/v1/guest/${id}`, {
    method: 'PUT',
    body,
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  if (editedGuest.status === 201) {
    return {
      ok: true,
      data: body,
      status: 200
    }
  }

  return {
    ok: false,
    error: {
      code: 'ERROR_CREATING_GUEST',
      message: 'Error creating guest'
    },
    status: 500
  }
}
