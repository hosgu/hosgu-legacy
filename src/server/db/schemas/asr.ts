import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'
import { customJsonb } from '../schema'

type CustomValueObject = {
  name: string
}

type Amenity = {
  ac?: boolean
  bedSheets?: boolean
  coffeeMachine?: boolean
  extraBed?: boolean
  garden?: boolean
  hotWater?: boolean
  glassesPlates?: boolean
  kitchen?: boolean
  oven?: boolean
  refrigerator?: boolean
  towels?: boolean
  tv?: boolean
}

type Service = {
  freeParking?: boolean
  laundry?: boolean
  pool?: boolean
  wifi?: boolean
}

type Rule = {
  smoking?: boolean
  petFriendly?: boolean
}

type Amenities = CustomValueObject[]
type Services = CustomValueObject[]
type Rules = CustomValueObject[]

const customJsonbAmenities = customJsonb<Amenities>('amenities')
const customJsonbServices = customJsonb<Services>('services')
const customJsonbRules = customJsonb<Rules>('rules')

export const asr = pgTable('asr', {
  id: uuid('id').primaryKey().defaultRandom(),
  amenities: customJsonbAmenities.default([]),
  services: customJsonbServices.default([]),
  rules: customJsonbRules.default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type ASR = typeof asr
export type ASRFields = typeof asr.$inferSelect & {
  amenities: Amenity
  services: Service
  rules: Rule
}
