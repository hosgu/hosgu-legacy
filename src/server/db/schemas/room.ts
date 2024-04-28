import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'
import { fee } from './fee'

export const room = pgTable('room', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  feeId: uuid('feeId')
    .references(() => fee.id)
    .notNull(),
  floor: varchar('floor', { length: 10 }).default('0'),
  roomNumber: varchar('roomNumber', { length: 10 }).default('0'),
  roomType: varchar('roomType', { length: 100 }),
  maxGuests: integer('maxGuests').default(6),
  minGuests: integer('minGuests').default(1),
  insideBathrooms: integer('insideBathrooms').default(1),
  outsideBathrooms: integer('outsideBathrooms').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Room = typeof room
export type RoomFields = typeof room.$inferSelect
