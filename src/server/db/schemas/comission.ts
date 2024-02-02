import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { agent } from './agent'
import { reservation } from './reservation'

export const comission = pgTable('comission', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agentId')
    .references(() => agent.id)
    .notNull(),
  reservationId: uuid('reservationId')
    .references(() => reservation.id)
    .notNull(),
  commission: integer('commission').notNull().default(0),
  isOffer: boolean('isOffer').notNull().default(false),
  isPaid: boolean('isPaid').notNull().default(false),
  paymentMethod: varchar('paymentMethod', { length: 100 }).notNull(),
  month: varchar('month', { length: 20 }).notNull(),
  year: varchar('year', { length: 20 }).notNull(),
  reservationCost: integer('reservationCost').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Comission = typeof comission
export type ComissionFields = typeof comission.$inferSelect
