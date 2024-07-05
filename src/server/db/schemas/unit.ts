import { pgTable, integer, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'
import { fee } from './fee'
import { amenity } from './amenity'

export const unit = pgTable('unit', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  feeId: uuid('feeId')
    .references(() => fee.id)
    .notNull(),
  amenityId: uuid('amenityId')
    .references(() => amenity.id)
    .notNull(),
  maxGuests: integer('maxGuests').default(6),
  minGuests: integer('minGuests').default(1),
  insideBathrooms: integer('insideBathrooms').default(1),
  outsideBathrooms: integer('outsideBathrooms').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Unit = typeof unit
export type UnitFields = typeof unit.$inferSelect
