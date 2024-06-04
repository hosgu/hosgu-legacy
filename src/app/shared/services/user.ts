import { cookies } from 'next/headers'
import api from '@architecturex/utils.api'
import security from '@architecturex/utils.security'
import slug from '@architecturex/utils.slug'

import { APIResponse, Token, CreatedItem } from '~/types'
import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('user')
  }

  async login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<APIResponse<Token>> {
    const cookiesStore = cookies()

    const response = await api.fetch<APIResponse<Token>>('/api/v1/user/login', {
      method: 'POST',
      body: { emailOrUsername: email, password },
      addLocalHost: process.env.NODE_ENV === 'development'
    })

    if (response.ok) {
      const [{ token = '' }] = response.items || []

      cookiesStore.set({
        name: 'at',
        value: token,
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    }

    return response
  }

  async initialSignup({
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
  }): Promise<any> {
    const code = security.string.code(10)
    const temporalPassword = security.password.encrypt('Abc123456$')

    const requests = [
      {
        url: '/api/v1/user/create',
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
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'emailAlreadyExists'
        }
      },
      ({ items }: any) => ({
        url: '/api/v1/business/create',
        method: 'POST',
        body: {
          userId: items[0].id,
          type: 'cabin',
          name: businessName,
          slug: slug(businessName),
          email: businessEmail,
          phone: businessPhone,
          priceRange: '0',
          website: businessWebsite,
          facebook: '',
          instagram: '',
          youtube: '',
          logo: '',
          raiting: 5,
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country,
          zipCode: '',
          active: true
        },
        error: {
          code: 'SERVER_ERROR_WHILE_CREATING_BUSINESS',
          message: 'serverErrorWhileCreatingBusiness'
        }
      })
    ]

    const { responses, errors } = await api.fetchChain(
      requests,
      process.env.NODE_ENV === 'development'
    )

    if (errors.length) {
      return {
        ok: false,
        error: errors[0]
      }
    }

    return {
      ok: true,
      responses
    }
  }

  async signup({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<APIResponse<CreatedItem>> {
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
}

const userService = new Service()

export default userService
