import api from '@architecturex/utils.api'
import slug from '@architecturex/utils.slug'

import { BusinessFields } from '~/server/db/schemas/business'
import { PropertyFields } from '~/server/db/schemas/property'
import { APIResponse, CreatedItem } from '~/types'
import ServiceHandler from './Service'
import e from 'express'

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

  async setup(values: any): Promise<APIResponse<CreatedItem>> {
    console.log('VALUES TO SAVE===>', values)
    const businessId = values.businessId
    const businessUpdatePayload = {
      name: values.propertyName,
      googleMapsUrl: values.googleMaps,
      addressLine1: values.address1,
      addressLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      zipCode: values.zipCode,
      email: values.email
    }
    console.log('Business Update DATA >>>>', businessUpdatePayload)
    const updateBusinessData = await api.fetch<APIResponse<BusinessFields>>(
      `/api/v1/business/${businessId}`,
      {
        method: 'PUT',
        body: businessUpdatePayload,
        addLocalHost: process.env.NODE_ENV === 'development'
      }
    )
    if (updateBusinessData.status !== 200) {
      console.log(`Error by tring to update business data ${updateBusinessData.error}`)
    }

    const propertyCreatePayload = {
      businessId,
      type: values.propertyType,
      name: values.propertyName,
      slug: slug(values.propertyName),
      description: '',
      floors: 1,
      rooms: 1,
      generalRules: '',
      safetyRules: '',
      cancellationPolicy: '',
      checkIn: '',
      checkOut: '',
      active: true
    }
    console.log('Property Create DATA >>>>', propertyCreatePayload)

    const createdProperty = await api.fetch<APIResponse<PropertyFields>>(
      `/api/v1/property/create`,
      {
        method: 'POST',
        body: propertyCreatePayload,
        addLocalHost: process.env.NODE_ENV === 'development'
      }
    )

    console.log('CREATED PROPERTY===>', createdProperty)

    if (createdProperty.status === 201) {
      const propertyId = createdProperty.items
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
