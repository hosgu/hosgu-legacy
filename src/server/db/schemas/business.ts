import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const business = pgTable('business', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  priceRange: varchar('priceRange', { length: 20 }),
  website: varchar('website', { length: 200 }),
  facebook: varchar('facebook', { length: 20 }),
  instagram: varchar('instagram', { length: 200 }),
  youtube: varchar('youtube', { length: 200 }),
  logo: varchar('logo', { length: 255 }).notNull(),
  raiting: integer('raiting').notNull(),
  addressLine1: varchar('addressLine1', { length: 255 }),
  addressLine2: varchar('addressLine2', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  zipCode: varchar('zipCode', { length: 20 }),
  active: boolean('active').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Business = typeof business
export type BusinessFields = typeof business.$inferSelect
