import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { business } from './business'
import { employee } from './employee'
import { reservation } from './reservation'
import { customJsonb, Notes } from '../schema'

const customJsonbNotes = customJsonb<Notes>('notes')

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
  date: varchar('date', { length: 20 }).notNull(),
  time: varchar('time', { length: 20 }).notNull(),
  notes: customJsonbNotes.notNull().default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Housekeeping = typeof housekeeping
export type HousekeepingFields = typeof housekeeping.$inferSelect
