import { pgTable, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'

export const tier = pgTable('tier', {
  id: uuid('id').primaryKey().defaultRandom(),
  tier: varchar('tier', { length: 100 }).unique().notNull(),
  description: text('description').notNull(),
  agents: integer('agents').notNull().default(0),
  guests: integer('guests').notNull().default(0),
  invoices: integer('invoices').notNull().default(0),
  users: integer('users').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Tier = typeof tier
export type TierFields = typeof tier.$inferSelect
