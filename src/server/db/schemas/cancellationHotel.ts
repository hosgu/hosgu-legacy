import { pgTable, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { reservationHotel } from './reservationHotel'

export const cancellationHotel = pgTable('cancellationHotel', {
  id: uuid('id').primaryKey().defaultRandom(),
  reservationId: uuid('reservationId')
    .references(() => reservationHotel.id)
    .notNull(),
  cancellationDate: varchar('cancellationDate', { length: 20 }),
  securityDepositReturned: integer('securityDepositReturned').default(0),
  securityDepositHeld: integer('securityDepositHeld').default(0),
  securityDepositFile: varchar('securityDepositFile', { length: 255 }),
  reason: text('reason').default(''),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type CancellationHotel = typeof cancellationHotel
export type CancellationHotelFields = typeof cancellationHotel.$inferSelect
