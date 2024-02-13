import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { business } from './business'
import { reservation } from './reservation'

export const invoice = pgTable('invoice', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  reservationId: uuid('reservationId')
    .references(() => reservation.id)
    .notNull(),
  invoiceNumber: integer('invoiceNumber').default(0),
  invoiceDate: varchar('invoiceDate', { length: 20 }),
  dueDate: varchar('dueDate', { length: 20 }),
  totalAmount: integer('totalAmount').default(0),
  paidAmount: integer('paidAmount').default(0),
  discount: integer('discount').default(0),
  status: varchar('status', { length: 20 }).default('pending'),
  paymentMethod: varchar('paymentMethod', { length: 100 }),
  paymentDate: varchar('paymentDate', { length: 20 }),
  nights: integer('nights').default(1),
  nightPrice: integer('nightPrice').default(0),
  cleaningFee: integer('cleaningFee').default(0),
  serviceFee: integer('serviceFee').default(0),
  tax: integer('tax').default(0),
  currency: varchar('currency', { length: 10 }).default('USD'),
  checkIn: varchar('checkIn', { length: 20 }),
  checkOut: varchar('checkOut', { length: 20 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Invoice = typeof invoice
export type InvoiceFields = typeof invoice.$inferSelect
