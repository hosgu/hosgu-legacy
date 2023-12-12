import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'

export const estate = pgTable('estate', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  floor: varchar('floor', { length: 10 }).notNull().default('0'),
  roomNumber: varchar('roomNumber', { length: 10 }).notNull().default('0'),
  roomType: varchar('roomType', { length: 100 }).notNull(),
  insideBathrooms: integer('insideBathrooms').notNull().default(1),
  outsideBathrooms: integer('outsideBathrooms').notNull().default(0),
  maxGuests: integer('maxGuests').notNull().default(6),
  minGuests: integer('minGuests').notNull().default(1),
  cleaningFee: integer('cleaningFee').notNull().default(0),
  extraGuestFee: integer('extraGuestFee').notNull().default(0),
  extraBedFee: integer('extraBedFee').notNull().default(0),
  securityDepositFee: integer('securityDepositFee').notNull().default(0),
  weekendFee: integer('weekendFee').notNull().default(0),
  weekdayFee: integer('weekdayFee').notNull().default(0),
  initialOfferFee: integer('initialOfferFee').notNull().default(0),
  secondOfferFee: integer('secondOfferFee').notNull().default(0),
  emergencyOfferFee: integer('emergencyOfferFee').notNull().default(0),
  highestFee: integer('highestFee').notNull().default(0),
  lowestFee: integer('lowestFee').notNull().default(0),
  hasWifi: boolean('hasWifi').notNull().default(true),
  hasTv: boolean('hasTv').notNull().default(true),
  hasNetflix: boolean('hasNetflix').notNull().default(true),
  hasHeat: boolean('hasHeat').notNull().default(false),
  hasAc: boolean('hasAc').notNull().default(false),
  hasIron: boolean('hasIron').notNull().default(false),
  hasDesk: boolean('hasDesk').notNull().default(false),
  hasKitchen: boolean('hasKitchen').notNull().default(true),
  hasCrib: boolean('hasCrib').notNull().default(true),
  isPetsAllowed: boolean('isPetsAllowed').notNull().default(false),
  isSmokingAllowed: boolean('isSmokingAllowed').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Estate = typeof estate
export type EstateFields = typeof estate.$inferSelect
