import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'

export const propertyCabin = pgTable('propertyCabin', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  insideBathrooms: integer('insideBathrooms').default(1),
  outsideBathrooms: integer('outsideBathrooms').default(0),
  maxGuests: integer('maxGuests').default(6),
  minGuests: integer('minGuests').default(1),
  cleaningFee: integer('cleaningFee').default(0),
  extraGuestFee: integer('extraGuestFee').default(0),
  extraBedFee: integer('extraBedFee').default(0),
  securityDepositFee: integer('securityDepositFee').default(0),
  weekendFee: integer('weekendFee').default(0),
  weekdayFee: integer('weekdayFee').default(0),
  initialOfferFee: integer('initialOfferFee').default(0),
  secondOfferFee: integer('secondOfferFee').default(0),
  emergencyOfferFee: integer('emergencyOfferFee').default(0),
  highestFee: integer('highestFee').default(0),
  lowestFee: integer('lowestFee').default(0),
  hasCrib: boolean('hasCrib').default(true),
  isPetsAllowed: boolean('isPetsAllowed').default(false),
  isSmokingAllowed: boolean('isSmokingAllowed').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type PropertyCabin = typeof propertyCabin
export type PropertyCabinFields = typeof propertyCabin.$inferSelect
