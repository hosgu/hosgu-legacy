import { pgTable, boolean, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { business } from './business'
import { asrTbl } from './asr'

export const property = pgTable('property', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  asrId: uuid('asrId')
    .references(() => asrTbl.id)
    .notNull(),
  typeOfBuilding: varchar('typeOfBuilding', { length: 50 }), // cabin, house, apartment, hotel, etc
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  description: text('description'),
  floors: integer('floors'),
  rooms: integer('rooms'),
  generalRules: text('generalRules'),
  safetyRules: text('safetyRules'),
  cancellationPolicy: text('cancellationPolicy'),
  checkIn: varchar('checkIn', { length: 50 }),
  checkOut: varchar('checkOut', { length: 50 }),
  active: boolean('active').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Property = typeof property
export type PropertyFields = typeof property.$inferSelect
