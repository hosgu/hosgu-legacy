'use server'
import core from '@architecturex/utils.core'

import { APIResponse } from '~/types'
import BusinessService from '../services/business'
import ASRService from '../services/asr'
import PropertyService from '../services/property'
import PhotoService from '../services/photo'
import UnitService from '../services/unit'
import FeeService from '../services/fee'
import SettingsService from '../services/setting'
import RoomService from '../services/room'
import UserService from '~/app/core/services/user'

import { ASRFields } from '~/server/db/schemas/asr'
import Property, { ASR } from '~/server/model/amenity/property'
import { PropertyFields } from '~/server/db/schemas/property'

export const setupProfile = async (e: FormData): Promise<APIResponse<any>> => {
  const data = core.formData.get(e)
  let generalResponse: APIResponse<any>
  const rooms: any[] = data.rooms ? JSON.parse(data.rooms) : []
  const images: string[] = JSON.parse(data.images)
  const businessId = data.businessId
  const businessItemData = {
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
    /* Creating new amenity by using amenity service class*/
    const amenityData: Map<string, boolean> = new Map(Object.entries(JSON.parse(data.amenities)))

    const asr: ASR = {
      amenity: {
        ac: !!amenityData.get('ac'),
        bedSheets: !!amenityData.get('bedSheets'),
        coffeeMachine: !!amenityData.get('coffeeMachine'),
        extraBed: !!amenityData.get('extraBed'),
        garden: !!amenityData.get('garden'),
        hotWater: !!amenityData.get('hotWater'),
        kitchen: !!amenityData.get('kitchen'),
        oven: !!amenityData.get('oven'),
        refrigerator: !!amenityData.get('refrigerator'),
        towels: !!amenityData.get('towels'),
        tv: !!amenityData.get('tv')
      },
      service: {
        freeParking: !!amenityData.get('freeParking'),
        laundry: !!amenityData.get('laundry'),
        pool: !!amenityData.get('pool'),
        wifi: !!amenityData.get('wifi')
      },
      rule: {
        smoking: !!amenityData.get('smoking'),
        petFriendly: !!amenityData.get('petFriendly')
      }
    }
    const propertyObj = new Property(asr)

    // Change to createdASR
    const createdASR = await ASRService.create(propertyObj)

    if (createdASR.ok) {
      const amenityCreated: ASRFields = createdASR.data
      let roomsCount = 0
      let floorsCount = 0

      if (rooms.length > 0) {
        const floorsItems = rooms.reduce((acc, obj) => {
          const floor = obj.floor
          acc[floor] = (acc[floor] || 0) + 1
          return acc
        }, [])

        floorsCount = floorsItems.length - 1
        roomsCount = floorsItems.reduce(
          (sum: number, num: number) => (num > 0 ? sum + num : sum),
          0
        )
      } else {
        floorsCount = 1
        roomsCount = data.bedrooms
      }

      const propertyData = {
        businessId: businessId,
        asrId: amenityCreated.id,
        name: data.propertyName,
        slug: '',
        description: '',
        floors: floorsCount,
        rooms: roomsCount,
        generalRules: '',
        safetyRules: '',
        cancellationPolicy: '',
        checkIn: `${data.checkInHour}:${data.checkInMinute} ${data.checkInPeriod}`,
        checkOut: `${data.checkOutHour}:${data.checkOutMinute} ${data.checkOutPeriod}`,
        active: true
      }

      const feeData = {
        weekdayFee: data.price
      }

      const createdFeeData = await FeeService.create(feeData)

      const createdProperty = await PropertyService.create(propertyData)

      if (createdProperty.ok && createdFeeData.ok) {
        const propertyCreated: PropertyFields = createdProperty.data
        const imagesPayload = images.map((image: string) => {
          return {
            url: image,
            propertyId: propertyCreated.id
          }
        })

        await PhotoService.create(imagesPayload)

        if (rooms.length > 0) {
          const roomsPayload = rooms.map((room: any) => {
            return {
              propertyId: createdProperty.data.id,
              feeId: createdFeeData.data.id,
              asrId: amenityCreated.id,
              floor: room.floor,
              roomNumber: room.roomNumber,
              roomType: room.type
            }
          })

          await RoomService.create(roomsPayload)
        } else {
          const unitData = {
            propertyId: createdProperty.data.id,
            feeId: createdFeeData.data.id,
            asrId: amenityCreated.id,
            maxGuests: data.guests,
            bedrooms: data.bathrooms,
            bathrooms: data.bathrooms,
            queenSizeBeds: data.beds
          }

          await UnitService.create(unitData)
        }

        const timezone =
          data.country === 'Mexico' ? 'GMT-6' : data.country === 'Canada' ? 'GTM-4' : 'GTM-4'

        const settingsData = {
          userId: data.userId,
          currency: data.currency,
          language: data.country,
          timezone
        }
        await SettingsService.create(settingsData)

        const userData = {
          id: data.userId,
          password: data.password,
          active: true
        }

        await UserService.update(userData.id, userData)
      }
    }
  }

  return generalResponse
}
