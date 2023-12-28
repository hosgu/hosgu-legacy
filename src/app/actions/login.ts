'use server'
import security from '@architecturex/utils.security'
import * as services from '../services'
import { APIResponse, Token } from '~/types'

export const loginServerAction = async (e: FormData): Promise<APIResponse<Token>> => {
  const emailInput = security.base64.encode('email', true)
  const passwordInput = security.base64.encode('password', true)
  const email = security.base64.decode(e.get(emailInput)?.toString(), true) as string
  const password = security.base64.decode(e.get(passwordInput)?.toString(), true) as string

  const response = await services.login({ email, password })

  return response
}
