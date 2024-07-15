'use server'
import core from '@architecturex/utils.core'

import { APIResponse } from '~/types'
import BusinessService from '../services/business'
import AmenityService from '../services/amenityServiceRule'
import PropertyService from '../services/property'

import { AmenityServiceRuleFields } from '~/server/db/schemas/amenityServiceRule'
import { PropertyFields } from '~/server/db/schemas/property'

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

export const setupProfile = async (e: FormData): Promise<APIResponse<any>> => {
  const data = core.formData.get(e)
  let generalResponse: APIResponse<any>
  console.log('From Data ===>', data)
  const businessId = data.businessId
  const businessItemData = {
    name: data.propertyName,
    googleMapsUrl: data.googleMaps,
    addressLine1: data.address1,
    addressLine2: data.address2,
    city: data.city,
    state: data.state,
    country: data.country,
    zipCode: data.zipCode,
    email: data.email
  }
  /* Updating business data by using business service class */
  generalResponse = await BusinessService.update(businessId, businessItemData)

  if (generalResponse.ok) {
    /* Creating new amenity by using ameniry service class*/
    const amenityData = {
      amenities: JSON.parse(data.amenities)
    }
    const createdAmenity = await AmenityService.create(amenityData)
    if (createdAmenity.ok) {
      const amenityCreated: AmenityServiceRuleFields = createdAmenity.data
      /* Assembly property data to create new property */
      const propertyData = {
        businessId: businessId,
        name: data.propertyName,
        slug: '',
        description: '',
        floors: 1,
        rooms: data.bedrooms,
        generalRules: '',
        safetyRules: '',
        cancellationPolicy: '',
        checkIn: `${data.checkInHour}:${data.checkInMinute} ${data.checkInPeriod}`,
        checkOut: `${data.checkOutHour}:${data.checkOutMinute} ${data.checkOutPeriod}`,
        active: true
      }
      const createdProperty = await PropertyService.create(propertyData)
      if (createdProperty.ok) {
      }
    }
  }

  return generalResponse
}
