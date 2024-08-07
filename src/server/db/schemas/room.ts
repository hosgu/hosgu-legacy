import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'
import { asrTbl } from './asr'
import { fee } from './fee'

export const room = pgTable('room', {
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
  floor: varchar('floor', { length: 10 }).default('0'),
  roomNumber: varchar('roomNumber', { length: 10 }).default('0'),
  roomType: varchar('roomType', { length: 100 }),
  maxGuests: integer('maxGuests').default(6),
  bathrooms: integer('bathrooms'),
  cribs: integer('cribs').default(0),
  kingSizeBeds: integer('kingSizeBeds').default(0),
  queenSizeBeds: integer('queenSizeBeds').default(0),
  singleSizeBeds: integer('singleSizeBeds').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Room = typeof room
export type RoomFields = typeof room.$inferSelect
