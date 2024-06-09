import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { agent } from './agent'
import { reservation } from './reservation'

export const commission = pgTable('commission', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agentId')
    .references(() => agent.id)
    .notNull(),
  reservationId: uuid('reservationId')
    .references(() => reservation.id)
    .notNull(),
  commission: integer('commission').default(0),
  isOffer: boolean('isOffer').default(false),
  isPaid: boolean('isPaid').default(false),
  paymentMethod: varchar('paymentMethod', { length: 100 }),
  reservationCost: integer('reservationCost').default(0),
  month: varchar('month', { length: 20 }),
  year: varchar('year', { length: 20 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Commission = typeof commission
export type CommissionFields = typeof commission.$inferSelect
