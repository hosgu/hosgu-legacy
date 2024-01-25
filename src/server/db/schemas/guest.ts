import { pgTable, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { business } from './business'
import { customJsonb, Notes } from '../schema'

const customJsonbNotes = customJsonb<Notes>('notes')

export const guest = pgTable('guest', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  fullName: varchar('fullName', { length: 200 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 40 }).notNull(),
  website: varchar('website', { length: 200 }),
  facebook: varchar('facebook', { length: 200 }),
  instagram: varchar('instagram', { length: 200 }),
  gender: varchar('gender', { length: 50 }).notNull(),
  birthday: varchar('birthday', { length: 20 }).notNull(),
  organization: varchar('organization', { length: 50 }).notNull(),
  taxIdentifier: varchar('taxIdentifier', { length: 50 }).notNull(),
  notes: text('notes'),
  photo: varchar('photo', { length: 250 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Guest = typeof guest
export type GuestFields = typeof guest.$inferSelect
