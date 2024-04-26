import { pgTable, boolean, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { propertyCabin } from './propertyCabin'
import { guest } from './guest'
import { customJsonb, Notes } from '../schema'

const customJsonbNotes = customJsonb<Notes>('notes')

export const reservationCabin = pgTable('reservationCabin', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => propertyCabin.id)
    .notNull(),
  guestId: uuid('guestId')
    .references(() => guest.id)
    .notNull(),
  startDate: varchar('startDate', { length: 20 }),
  endDate: varchar('endDate', { length: 20 }),
  nights: integer('nights').default(0),
  freeNights: integer('freeNights').default(0),
  occupancy: integer('occupancy').default(0),
  adults: integer('adults').default(0),
  children: integer('children').default(0),
  infants: integer('infants').default(0),
  pets: integer('pets').default(0),
  extraOccupancy: integer('extraOccupancy').default(0),
  pendingAmount: integer('pendingAmount').default(0),
  totalAmount: integer('totalAmount').default(0),
  paidAmount: integer('paidAmount').default(0),
  discount: integer('discount').default(0),
  taxes: integer('taxes').default(0),
  cleaningFee: integer('cleaningFee').default(0),
  serviceFee: integer('serviceFee').default(0),
  securityDeposit: integer('securityDeposit').default(0),
  securityDepositFile: varchar('securityDepositFile', { length: 255 }),
  needCrib: boolean('needCrib').default(false),
  isCancelled: boolean('isCancelled').default(false),
  isOffer: boolean('isOffer').default(false),
  offerDetails: text('offerDetails').default(''),
  notes: customJsonbNotes.default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type ReservationCabin = typeof reservationCabin
export type ReservationCabinFields = typeof reservationCabin.$inferSelect
