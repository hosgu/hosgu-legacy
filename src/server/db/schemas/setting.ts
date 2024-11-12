import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const setting = pgTable('setting', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  language: varchar('language', { length: 10 }).default('en-us'),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  theme: varchar('theme', { length: 20 }).default('dark'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Setting = typeof setting
export type SettingFields = typeof setting.$inferSelect
