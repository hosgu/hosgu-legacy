import { pgTable, boolean, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  tier: varchar('tier', { length: 100 }),
  role: varchar('role', { length: 100 }),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 40 }),
  fullName: varchar('fullName', { length: 200 }),
  phone: varchar('phone', { length: 50 }),
  avatar: varchar('avatar', { length: 255 }),
  birthday: varchar('birthday', { length: 20 }),
  website: varchar('website', { length: 255 }),
  code: varchar('code', { length: 10 }).unique(),
  active: boolean('active').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type User = typeof user
export type UserFields = typeof user.$inferSelect
