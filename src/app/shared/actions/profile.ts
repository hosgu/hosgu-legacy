'use server'
import core from '@architecturex/utils.core'

import { APIResponse } from '~/types'
import BusinessService from '../services/business'
import AmenityService from '../services/amenityServiceRule'
import PropertyService from '../services/property'
import PhotoService from '../services/photo'

import { ASRFields } from '~/server/db/schemas/asr'
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
  console.log('From Data Server Action ===>', data)
  const images: string[] = JSON.parse(data.images)
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
    const amenityData: Map<string, boolean> = new Map(Object.entries(JSON.parse(data.amenities)))

    const amenities = {
      ac: amenityData.get('ac'),
      bedSheets: amenityData.get('bedSheets'),
      coffeeMachine: amenityData.get('coffeeMachine'),
      extraBed: amenityData.get('extraBed'),
      garden: amenityData.get('garden'),
      hotWater: amenityData.get('hotWater'),
      glassesPlates: amenityData.get('glassesPlates'),
      kitchen: amenityData.get('kitchen'),
      oven: amenityData.get('oven'),
      refrigerator: amenityData.get('refrigerator'),
      towels: amenityData.get('towels'),
      tv: amenityData.get('tv')
    }

    const services = {
      freeParking: amenityData.get('freeParking'),
      laundry: amenityData.get('laundry'),
      pool: amenityData.get('pool'),
      wifi: amenityData.get('wifi')
    }

    const rules = {
      smoking: amenityData.get('smoking'),
      petFriendly: amenityData.get('petFriendly')
    }

    const asr = {
      amenities,
      services,
      rules
    }

    const createdAmenity = await AmenityService.create(asr)
    if (createdAmenity.ok) {
      const amenityCreated: ASRFields = createdAmenity.data
      /* Assembly property data to create new property */
      console.log('amenityCreated ===>>>:::', amenityCreated)
      const propertyData = {
        businessId: businessId,
        asrId: amenityCreated.id,
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
        console.log('Property - Data ===>>>', createdProperty.data)
        const propertyCreated: PropertyFields = createdProperty.data
        const imagesPayload = images.map((image: string) => {
          return {
            url: image,
            propertyId: propertyCreated.id
          }
        })
        const imagesCreated = await PhotoService.create(imagesPayload)
        console.log('Images Created at DB ==>', imagesCreated)
      }
    }
  }

  return generalResponse
}
