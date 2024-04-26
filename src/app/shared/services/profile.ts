import api from '@architecturex/utils.api'
import slug from '@architecturex/utils.slug'

import { BusinessFields } from '~/server/db/schemas/business'
import { EstateFields } from '~/server/db/schemas/estate'
import { PropertyFields } from '~/server/db/schemas/property'
import { UserFields } from '~/server/db/schemas/user'
import { APIResponse, CreatedItem } from '~/types'
import ServiceHandler from './Service'

type ProfileSetupPayload = {
  userId: string
  fullName: string
  email: string
  countryCode: string
  phoneNumber: string
  businessName: string
  propertyName: string
  propertyAddress1: string
  propertyAddress2: string
  propertyCity: string
  propertyState: string
  propertyCountry: string
  propertyZipCode: string
  propertyType: string
  propertyWebsite: string
}

class Service extends ServiceHandler {
  constructor() {
    super('reservation')
  }

  async setup({
    userId,
    fullName,
    email,
    countryCode,
    phoneNumber,
    businessName,
    propertyName,
    propertyAddress1,
    propertyAddress2,
    propertyCity,
    propertyState,
    propertyCountry,
    propertyZipCode,
    propertyType,
    propertyWebsite
  }: ProfileSetupPayload): Promise<APIResponse<CreatedItem>> {
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
        const [property] = createdProperty.items as PropertyFields[]
        const propertyId = property.id

        const createdEstate = await api.fetch<APIResponse<EstateFields>>(`/api/v1/estate/create`, {
          method: 'POST',
          body: {
            propertyId,
            type: propertyType,
            floor: 12,
            roomNumber: 1,
            roomType: propertyType === 'hotel' ? 'single' : 'entire',
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
          },
          addLocalHost: process.env.NODE_ENV === 'development'
        })

        const [estate] = createdEstate.items as EstateFields[]
        const estateId = estate.id

        return {
          ok: true,
          data: {
            userId,
            businessId,
            propertyId,
            estateId
          },
          status: 200
        }
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
