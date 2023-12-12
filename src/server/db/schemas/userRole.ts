import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'

export const userRole = pgTable('userRole', {
  id: uuid('id').primaryKey().defaultRandom(),
  role: varchar('role', { length: 100 }).unique().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type UserRole = typeof userRole
export type UserRoleFields = typeof userRole.$inferSelect
