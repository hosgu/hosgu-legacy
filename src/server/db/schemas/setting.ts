import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const setting = pgTable('setting', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  currency: varchar('currency', { length: 10 }).notNull().default('USD'),
  language: varchar('language', { length: 10 }).notNull().default('en'),
  timezone: varchar('timezone', { length: 50 }).notNull().default('UTC'),
  taxesPercentage: integer('taxesPercentage').notNull().default(0),
  minimumBooking: integer('minimumBooking').notNull().default(1),
  theme: varchar('theme', { length: 20 }).notNull().default('dark'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Setting = typeof setting
export type SettingFields = typeof setting.$inferSelect
