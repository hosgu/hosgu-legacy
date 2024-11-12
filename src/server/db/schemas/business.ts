import { pgTable, boolean, text, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const business = pgTable('business', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  priceRange: varchar('priceRange', { length: 5 }),
  website: varchar('website', { length: 200 }),
  facebook: varchar('facebook', { length: 200 }),
  instagram: varchar('instagram', { length: 200 }),
  logo: varchar('logo', { length: 255 }),
  rating: integer('rating'),
  addressLine1: varchar('addressLine1', { length: 255 }),
  addressLine2: varchar('addressLine2', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  currency: varchar('currency', { length: 10 }).default('USD'),
  taxesPercentage: integer('taxesPercentage').default(0),
  minimumBooking: integer('minimumBooking').default(1),
  zipCode: varchar('zipCode', { length: 20 }),
  googleMapsUrl: text('googleMapsUrl'),
  active: boolean('active').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Business = typeof business
export type BusinessFields = typeof business.$inferSelect
