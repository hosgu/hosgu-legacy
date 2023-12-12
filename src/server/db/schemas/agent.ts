import { pgTable, boolean, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { business } from './business'
import { user } from './user'

export const agent = pgTable('agent', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  isCompany: boolean('isCompany').notNull().default(false),
  comissionType: varchar('comissionType', { length: 100 }).notNull().default('fixed'),
  highestCommissionWihoutOffer: integer('highestCommissionWihoutOffer').notNull().default(0),
  highestCommissionWithOffer: integer('highestCommissionWithOffer').notNull().default(0),
  lowestCommissionWihoutOffer: integer('lowestCommissionWihoutOffer').notNull().default(0),
  lowestCommissionWithOffer: integer('lowestCommissionWithOffer').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Agent = typeof agent
export type AgentFields = typeof agent.$inferSelect
