'use server'
import security from '@architecturex/utils.security'
import { APIResponse, CreatedItem } from '~/types'
import * as services from '../services'

export const signupServerAction = async (e: FormData): Promise<APIResponse<CreatedItem>> => {
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

  const response = await services.signup({ email, password })

  return response
}
