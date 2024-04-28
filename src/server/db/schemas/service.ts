import { pgTable, boolean, uuid, timestamp } from 'drizzle-orm/pg-core'

export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  airportShuttle: boolean('airportShuttle').default(false),
  bar: boolean('bar').default(false),
  childcareServices: boolean('childcareServices').default(false),
  concierge: boolean('concierge').default(false),
  eventPlanningServices: boolean('eventPlanningServices').default(false),
  housekeeping: boolean('housekeeping').default(false),
  laundryService: boolean('laundryService').default(false),
  petServices: boolean('petServices').default(false),
  restaurant: boolean('restaurant').default(false),
  roomService: boolean('roomService').default(false),
  spa: boolean('spa').default(false),
  transportationServices: boolean('transportationServices').default(false),
  valetParking: boolean('valetParking').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Service = typeof service
export type ServiceFields = typeof service.$inferSelect
