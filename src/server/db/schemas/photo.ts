import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { property } from './property'

export const photo = pgTable('photo', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('propertyId')
    .references(() => property.id)
    .notNull(),
  caption: varchar('caption', { length: 255 }),
  fileSize: integer('fileSize'),
  fileType: varchar('fileType', { length: 50 }),
  url: varchar('url', { length: 255 }),
  visibility: varchar('visibility', { length: 50 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Photo = typeof photo
export type PhotoFields = typeof photo.$inferSelect
