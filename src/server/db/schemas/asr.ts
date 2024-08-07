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

type ASRType = {
  asr: {
    amenity: Amenities
    service: Services
    rule: Rules
  }
}
const customJsonbASRs = customJsonb<ASRType>('asr')

export const asrTbl = pgTable('asr', {
  id: uuid('id').primaryKey().defaultRandom(),
  asr: customJsonbASRs,
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type ASR = typeof asrTbl
export type ASRFields = typeof asrTbl.$inferSelect & {
  amenities: Amenity
  services: Service
  rules: Rule
}
