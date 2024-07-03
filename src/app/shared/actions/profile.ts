'use server'
import core from '@architecturex/utils.core'

import { APIResponse } from '~/types'
import ProfileService from '../services/profile'

interface ProfileSetupPayload {
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
  console.log('Profile Data ===>', data)
  const response = await ProfileService.setup(data)

  return response
}
