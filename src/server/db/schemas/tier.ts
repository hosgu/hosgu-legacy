import { pgTable, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'

export const tier = pgTable('tier', {
  id: uuid('id').primaryKey().defaultRandom(),
  tier: varchar('tier', { length: 100 }).unique(),
  description: text('description'),
  agents: integer('agents').default(0),
  guests: integer('guests').default(0),
  invoices: integer('invoices').default(0),
  users: integer('users').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Tier = typeof tier
export type TierFields = typeof tier.$inferSelect
