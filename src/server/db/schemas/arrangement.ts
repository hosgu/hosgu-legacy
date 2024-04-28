import { pgTable, integer, uuid, timestamp } from 'drizzle-orm/pg-core'

export const arrangement = pgTable('arrangement', {
  id: uuid('id').primaryKey().defaultRandom(),
  airMattresses: integer('airMattresses').default(0),
  bedrooms: integer('bedrooms'),
  bunkBeds: integer('bunkBeds').default(0),
  cribs: integer('cribs').default(0),
  futons: integer('futons').default(0),
  hammocks: integer('hammocks').default(0),
  kingSizeBeds: integer('kingSizeBeds').default(0),
  queenSizeBeds: integer('queenSizeBeds').default(0),
  singleSizeBeds: integer('singleSizeBeds').default(0),
  sofaBeds: integer('sofaBeds').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Arrangement = typeof arrangement
export type ArrangementFields = typeof arrangement.$inferSelect
