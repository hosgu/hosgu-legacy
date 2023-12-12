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
  invoiceNumber: integer('invoiceNumber').notNull().default(0),
  invoiceDate: varchar('invoiceDate', { length: 20 }).notNull(),
  dueDate: varchar('dueDate', { length: 20 }).notNull(),
  totalAmount: integer('totalAmount').notNull().default(0),
  paidAmount: integer('paidAmount').notNull().default(0),
  discount: integer('discount').notNull().default(0),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  paymentMethod: varchar('paymentMethod', { length: 100 }).notNull(),
  paymentDate: varchar('paymentDate', { length: 20 }).notNull(),
  nights: integer('nights').notNull().default(1),
  nightPrice: integer('nightPrice').notNull().default(0),
  cleaningFee: integer('cleaningFee').notNull().default(0),
  serviceFee: integer('serviceFee').notNull().default(0),
  tax: integer('tax').notNull().default(0),
  currency: varchar('currency', { length: 10 }).notNull().default('USD'),
  checkIn: varchar('checkIn', { length: 20 }).notNull(),
  checkOut: varchar('checkOut', { length: 20 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Invoice = typeof invoice
export type InvoiceFields = typeof invoice.$inferSelect
