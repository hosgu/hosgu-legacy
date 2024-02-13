import { pgTable, integer, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { business } from './business'

export const employee = pgTable('employee', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  designation: varchar('designation', { length: 100 }),
  fullName: varchar('fullName', { length: 200 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 40 }),
  salary: integer('salary').default(0),
  jobTitle: varchar('jobTitle', { length: 100 }),
  photo: varchar('photo', { length: 255 }),
  addressLine1: varchar('addressLine1', { length: 255 }),
  addressLine2: varchar('addressLine2', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  zipCode: varchar('zipCode', { length: 20 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Employee = typeof employee
export type EmployeeFields = typeof employee.$inferSelect
