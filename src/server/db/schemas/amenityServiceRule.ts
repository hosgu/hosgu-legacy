import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'
import { customJsonb } from '../schema'

type CustomValueObject = {
  name: string
}

type AmenitiesServices = CustomValueObject[]
type Rules = CustomValueObject[]

const customJsonbAmenitiesServices = customJsonb<AmenitiesServices>('amenitiesServices')
const customJsonbRules = customJsonb<Rules>('rules')

export const amenityServiceRule = pgTable('asr_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 100 }).default('basic'),
  amenitiesServices: customJsonbAmenitiesServices.default([]),
  rules: customJsonbRules.default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type AmenityServiceRule = typeof amenityServiceRule
export type AmenityServiceRuleFields = typeof amenityServiceRule.$inferSelect
