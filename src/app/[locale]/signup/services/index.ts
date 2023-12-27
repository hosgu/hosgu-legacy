import api from '@architecturex/utils.api'
import security from '@architecturex/utils.security'

import { APIResponse, CreatedItem } from '~/types'

export const initialSignup = async ({
  fullName,
  businessName,
  businessEmail,
  businessPhone,
  businessWebsite,
  country
}: {
  fullName: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessWebsite: string
  country: string
}): Promise<APIResponse<CreatedItem>> => {
  const code = security.string.code(10)
  const temporalPassword = security.password.encrypt(code)

  const response = await api.fetch<APIResponse<CreatedItem>>('/api/v1/user/create', {
    method: 'POST',
    body: {
      tier: 'free',
      role: 'business.admin',
      email: businessEmail,
      password: temporalPassword,
      fullName,
      phone: businessPhone,
      avatar: '',
      birthday: '',
      website: businessWebsite,
      code,
      active: false
    },
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  console.log('RESPONSE====>', response)
  return response
}

export const signup = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<APIResponse<CreatedItem>> => {
  const response = await api.fetch<APIResponse<CreatedItem>>('/api/v1/user/create', {
    method: 'POST',
    body: {
      email,
      password
    },
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return response
}
