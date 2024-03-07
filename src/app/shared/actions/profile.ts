'use server'
import { APIResponse } from '~/types'
import ProfileService from '../services/profile'

export const setupProfile = async (e: FormData): Promise<APIResponse<any>> => {
  const userId = e.get('userId')?.toString() as string
  const email = e.get('email')?.toString() as string
  const fullName = e.get('fullName')?.toString() as string
  const countryCode = e.get('countryCode')?.toString() as string
  const businessName = e.get('businessName')?.toString() as string
  const phoneNumber = e.get('phoneNumber')?.toString() as string
  const propertyName = e.get('propertyName')?.toString() as string
  const propertyAddress1 = e.get('propertyAddress1')?.toString() as string
  const propertyAddress2 = e.get('propertyAddress2')?.toString() as string
  const propertyCity = e.get('propertyCity')?.toString() as string
  const propertyState = e.get('propertyState')?.toString() as string
  const propertyCountry = e.get('propertyCountry')?.toString() as string
  const propertyZipCode = e.get('propertyZipCode')?.toString() as string
  const propertyType = e.get('propertyType')?.toString() as string
  const propertyWebsite = e.get('propertyWebsite')?.toString() as string

  const response = await ProfileService.setup({
    userId,
    email,
    fullName,
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
  })

  return response
}
