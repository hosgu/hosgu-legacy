import api from '@architecturex/utils.api'
import security from '@architecturex/utils.security'
import slug from '@architecturex/utils.slug'

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
}): Promise<any> => {
  const code = security.string.code(10)
  const temporalPassword = security.password.encrypt(code)

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
      }
    }),
    ({ items }: any) => ({
      url: '/api/v1/property/create',
      method: 'POST',
      body: {
        businessId: items[0].id,
        type: 'cabin',
        name: '',
        slug: '',
        description: '',
        floors: 1,
        rooms: 1,
        generalRules: '',
        safetyRules: '',
        cancellationPolicy: '',
        checkIn: '3:00 PM',
        checkOut: '12:00 PM',
        active: true
      }
    }),
    ({ items }: any) => ({
      url: '/api/v1/estate/create',
      method: 'POST',
      body: {
        propertyId: items[0].id,
        type: 'cabin',
        floor: 1,
        roomNumber: 1,
        roomType: 'entire',
        insideBathroom: 1,
        outsideBathroom: 0,
        maxGuests: 6,
        minGuests: 1,
        cleaningFee: 0,
        extraGuestFee: 0,
        extraBedFee: 0,
        securityDepositFee: 0,
        weekendFee: 0,
        weekdayFee: 0,
        initialOfferFee: 0,
        secondOfferFee: 0,
        emergencyOfferFee: 0,
        highestFee: 0,
        lowestFee: 0,
        hasWifi: true,
        hasTv: true,
        hasNetflix: true,
        hasHeat: false,
        hasAc: true,
        hasIron: true,
        hasDesk: true,
        hasKitchen: true,
        hasCrib: true,
        isPetsAllowed: false,
        isSmokingAllowed: false
      }
    })
  ]

  try {
    const { responses, errors } = await api.fetchChain(
      requests,
      process.env.NODE_ENV === 'development'
    )

    if (errors.length) {
      return errors
    }
    console.log('Fetch chain responses:', responses)
    return responses
  } catch (error) {
    console.error('Fetch chain failed:', error)
    return error
  }
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
