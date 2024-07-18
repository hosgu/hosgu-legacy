import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'

export const photo = pgTable('photo', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  url: varchar('url', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Photo = typeof photo
export type PhotoFields = typeof photo.$inferSelect
