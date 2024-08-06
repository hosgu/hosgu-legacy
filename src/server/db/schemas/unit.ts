import { pgTable, integer, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'
import { fee } from './fee'
import { asrTbl } from './asr'

export const unit = pgTable('unit', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  feeId: uuid('feeId')
    .references(() => fee.id)
    .notNull(),
  asrId: uuid('asrId')
    .references(() => asrTbl.id)
    .notNull(),
  maxGuests: integer('maxGuests').default(6),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  cribs: integer('cribs').default(0),
  kingSizeBeds: integer('kingSizeBeds').default(0),
  queenSizeBeds: integer('queenSizeBeds').default(0),
  singleSizeBeds: integer('singleSizeBeds').default(0),
  sofaBeds: integer('sofaBeds').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Unit = typeof unit
export type UnitFields = typeof unit.$inferSelect
