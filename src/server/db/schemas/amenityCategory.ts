import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'

export const amenityCategory = pgTable('amenity', {
  id: uuid('id').primaryKey().defaultRandom(),
  amenityId: uuid('amenityId').notNull(),
  name: varchar('name').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type AmenityCategory = typeof amenityCategory
export type AmenityCategoryFields = typeof amenityCategory.$inferSelect
