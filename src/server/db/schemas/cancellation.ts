import { pgTable, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { reservation } from './reservation'

export const cancellation = pgTable('cancellation', {
  id: uuid('id').primaryKey().defaultRandom(),
  reservationId: uuid('reservationId')
    .references(() => reservation.id)
    .notNull(),
  cancellationDate: varchar('cancellationDate', { length: 20 }).notNull(),
  securityDepositReturned: integer('securityDepositReturned').notNull().default(0),
  securityDepositHeld: integer('securityDepositHeld').notNull().default(0),
  securityDepositFile: varchar('securityDepositFile', { length: 255 }).notNull(),
  reason: text('reason').notNull().default(''),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Cancellation = typeof cancellation
export type CancellationFields = typeof cancellation.$inferSelect
