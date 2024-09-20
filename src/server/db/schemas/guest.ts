import { pgTable, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { business } from './business'

export const guest = pgTable('guest', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  fullName: varchar('fullName', { length: 200 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 40 }),
  website: varchar('website', { length: 200 }),
  facebook: varchar('facebook', { length: 200 }),
  instagram: varchar('instagram', { length: 200 }),
  gender: varchar('gender', { length: 50 }),
  birthday: varchar('birthday', { length: 20 }),
  organization: varchar('organization', { length: 50 }),
  taxIdentifier: varchar('taxIdentifier', { length: 50 }),
  photo: varchar('photo', { length: 250 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Guest = typeof guest
export type GuestFields = typeof guest.$inferSelect
