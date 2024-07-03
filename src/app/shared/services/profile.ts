import api from '@architecturex/utils.api'
import slug from '@architecturex/utils.slug'

import { BusinessFields } from '~/server/db/schemas/business'
import { PropertyFields } from '~/server/db/schemas/property'
import { UserFields } from '~/server/db/schemas/user'
import { APIResponse, CreatedItem } from '~/types'
import ServiceHandler from './Service'

type ProfileSetupPayload = {
  amenities: Map<string, boolean>
  address1: string
  address2: string
  bathrooms: number
  bedrooms: number
  beds: number
  businessId: string
  price: number
  checkInHour: string
  checkInMinute: string
  checkInPeriod: string
  checkOutHour: string
  checkOutMinute: string
  checkOutPeriod: string
  city: string
  country: string
  currency: string
  email: string
  googleMaps: string
  guests: number
  images: []
  password: string
  propertyName: string
  propertyType: string
  state: string
  tmpImages: []
  userId: string
  zipCode: string
}

class Service extends ServiceHandler {
  constructor() {
    super('reservation')
  }

  async setup(values: ProfileSetupPayload): Promise<APIResponse<CreatedItem>> {
    await api.fetch<APIResponse<UserFields>>(`/api/v1/user/${userId}`, {
      method: 'PUT',
      body: {
        website: propertyWebsite,
        fullName,
        phone: `${countryCode} ${phoneNumber}`,
        active: true
      },
      addLocalHost: process.env.NODE_ENV === 'development'
    })

    const createdBusiness = await api.fetch<APIResponse<BusinessFields>>(
      `/api/v1/business/create`,
      {
        method: 'POST',
        body: {
          userId,
          type: propertyType,
          name: businessName,
          slug: slug(businessName),
          email,
          phone: `${countryCode} ${phoneNumber}`,
          priceRange: '0',
          website: propertyWebsite,
          facebook: '',
          instagram: '',
          youtube: '',
          logo: '',
          raiting: 5,
          addressLine1: propertyAddress1,
          addressLine2: propertyAddress2,
          city: propertyCity,
          state: propertyState,
          country: propertyCountry,
          zipCode: propertyZipCode,
          active: true
        },
        addLocalHost: process.env.NODE_ENV === 'development'
      }
    )

    if (createdBusiness.status === 201) {
      const [business] = createdBusiness.items as BusinessFields[]
      const businessId = business.id

      const createdProperty = await api.fetch<APIResponse<PropertyFields>>(
        `/api/v1/property/create`,
        {
          method: 'POST',
          body: {
            businessId,
            type: propertyType,
            name: propertyName,
            slug: slug(propertyName),
            description: '',
            floors: 1,
            rooms: 1,
            generalRules: '',
            safetyRules: '',
            cancellationPolicy: '',
            checkIn: '',
            checkOut: '',
            active: true
          },
          addLocalHost: process.env.NODE_ENV === 'development'
        }
      )

      if (createdProperty.status === 201) {
      }
    }

    return {
      ok: false,
      error: {
        code: 'ERROR_CREATING_BUSINESS',
        message: 'Error creating business'
      },
      status: 500
    }
  }
}

const profileService = new Service()

export default profileService
