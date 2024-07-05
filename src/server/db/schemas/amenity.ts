import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'
import { customJsonb } from '../schema'

type CustomAmenity = {
  name: string
}

type Amenities = CustomAmenity[]

const customJsonbAmenities = customJsonb<Amenities>('amenities')

export const amenity = pgTable('amenity', {
  id: uuid('id').primaryKey().defaultRandom(),
  amenities: customJsonbAmenities.default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Amenity = typeof amenity
export type AmenityFields = typeof amenity.$inferSelect
