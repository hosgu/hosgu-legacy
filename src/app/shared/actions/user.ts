'use server'
import core from '@architecturex/utils.core'
import security from '@architecturex/utils.security'

import UserService from '~/app/shared/services/user'
import { APIResponse, Token } from '~/types'

export const getAll = async () => {
  const response = await UserService.getAll()
  return response
}

export const del = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await UserService.delete(id)

  return response
}

export const login = async (e: FormData): Promise<APIResponse<Token>> => {
  const emailInput = security.base64.encode('email', true)
  const passwordInput = security.base64.encode('password', true)
  const email = security.base64.decode(e.get(emailInput)?.toString(), true) as string
  const password = security.base64.decode(e.get(passwordInput)?.toString(), true) as string

  const response = await UserService.login({ email, password })

  return response
}

export const initialSignup = async (e: FormData): Promise<APIResponse<CreatedItem>> => {
  const { fullName, businessName, businessEmail, businessPhone, businessWebsite, country } =
    core.formData.get(e)

  if (
    !fullName ||
    !businessName ||
    !businessEmail ||
    !businessPhone ||
    !businessWebsite ||
    !country
  ) {
    return {
      ok: false,
      status: 400,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'Missing required fields'
      }
    }
  }

  const response = await UserService.initialSignup({
    fullName,
    businessName,
    businessEmail,
    businessPhone,
    businessWebsite,
    country
  })

  return response
}

export const signup = async (e: FormData): Promise<APIResponse<CreatedItem>> => {
  const emailInput = security.base64.encode('email', true)
  const passwordInput = security.base64.encode('password', true)

  const email = security.base64.decode(e.get(emailInput)?.toString(), true) as string
  const password = security.base64.decode(e.get(passwordInput)?.toString(), true) as string

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'Missing required fields'
      }
    }
  }

  const response = await UserService.signup({ email, password })

  return response
}

export const getConnectedUser = async (at: string) => {
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at
    },
    returnFirstItemOnly: true
  })

  return connectedUser
}
