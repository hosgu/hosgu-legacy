import { pgTable, boolean, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { estate } from './estate'
import { guest } from './guest'
import { customJsonb, Notes } from '../schema'

const customJsonbNotes = customJsonb<Notes>('notes')

export const reservation = pgTable('reservation', {
  id: uuid('id').primaryKey().defaultRandom(),
  estateId: uuid('estateId')
    .references(() => estate.id)
    .notNull(),
  guestId: uuid('guestId')
    .references(() => guest.id)
    .notNull(),
  startDate: varchar('startDate', { length: 20 }).notNull(),
  endDate: varchar('endDate', { length: 20 }).notNull(),
  nights: integer('nights').notNull().default(0),
  freeNights: integer('freeNights').notNull().default(0),
  occupancy: integer('occupancy').notNull().default(0),
  adults: integer('adults').notNull().default(0),
  children: integer('children').notNull().default(0),
  infants: integer('infants').notNull().default(0),
  pets: integer('pets').notNull().default(0),
  extraOccupancy: integer('extraOccupancy').notNull().default(0),
  pendingAmount: integer('pendingAmount').notNull().default(0),
  totalAmount: integer('totalAmount').notNull().default(0),
  paidAmount: integer('paidAmount').notNull().default(0),
  discount: integer('discount').notNull().default(0),
  taxes: integer('taxes').notNull().default(0),
  cleaningFee: integer('cleaningFee').notNull().default(0),
  serviceFee: integer('serviceFee').notNull().default(0),
  securityDeposit: integer('securityDeposit').notNull().default(0),
  securityDepositFile: varchar('securityDepositFile', { length: 255 }).notNull(),
  needCrib: boolean('needCrib').notNull().default(false),
  isCancelled: boolean('isCancelled').notNull().default(false),
  isOffer: boolean('isOffer').notNull().default(false),
  offerDetails: text('offerDetails').notNull().default(''),
  notes: customJsonbNotes.notNull().default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Reservation = typeof reservation
export type ReservationFields = typeof reservation.$inferSelect
