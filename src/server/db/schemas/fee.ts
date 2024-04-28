import { pgTable, integer, uuid, timestamp } from 'drizzle-orm/pg-core'

export const fee = pgTable('fee', {
  id: uuid('id').primaryKey().defaultRandom(),
  cleaningFee: integer('cleaningFee').default(0),
  emergencyOfferFee: integer('emergencyOfferFee').default(0),
  extraBedFee: integer('extraBedFee').default(0),
  extraGuestFee: integer('extraGuestFee').default(0),
  highestFee: integer('highestFee').default(0),
  initialOfferFee: integer('initialOfferFee').default(0),
  lowestFee: integer('lowestFee').default(0),
  secondOfferFee: integer('secondOfferFee').default(0),
  securityDepositFee: integer('securityDepositFee').default(0),
  weekdayFee: integer('weekdayFee').default(0),
  weekendFee: integer('weekendFee').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Fee = typeof fee
export type FeeFields = typeof fee.$inferSelect
