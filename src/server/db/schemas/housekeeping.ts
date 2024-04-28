import { pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { business } from './business'
import { employee } from './employee'
import { reservation } from './reservation'

export const housekeeping = pgTable('housekeeping', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  employeeId: uuid('employeeId')
    .references(() => employee.id)
    .notNull(),
  reservationId: uuid('reservationId')
    .references(() => reservation.id)
    .notNull(),
  date: varchar('date', { length: 20 }),
  time: varchar('time', { length: 20 }),
  notes: text('notes').default(''),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Housekeeping = typeof housekeeping
export type HousekeepingFields = typeof housekeeping.$inferSelect
