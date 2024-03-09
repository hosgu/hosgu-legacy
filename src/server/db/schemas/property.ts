import { pgTable, boolean, integer, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
import { business } from './business'
import { customJsonb } from '../schema'

type Amenity = {
  name: string
  i18n: string
  exists?: boolean
}

type Amenities = Amenity[]

type Photo = {
  url: string
  caption: string
}

type Photos = Photo[]

type Service = {
  name: string
  i18n: string
  exists?: boolean
}

type Services = Service[]

type SleepingArrangement = {
  bedrooom: number
  kingSizeBeds?: number
  queenSizeBeds?: number
  doubleSizeBeds?: number
  singleSizeBeds?: number
  sofaBeds?: number
  bunkBeds?: number
  futons?: number
  hammocks?: number
  airMattresses?: number
  cribs?: number
}

type SleepingArrangements = SleepingArrangement[]

const customJsonbAmenities = customJsonb<Amenities>('amenities')
const customJsonbPhotos = customJsonb<Photos>('photos')
const customJsonbSleepingArrangements = customJsonb<SleepingArrangements>('sleepingArrangements')
const customJsonbServices = customJsonb<Services>('services')

export const property = pgTable('property', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('businessId')
    .references(() => business.id)
    .notNull(),
  type: varchar('type', { length: 100 }),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  description: text('description'),
  floors: integer('floors'),
  rooms: integer('rooms'),
  photos: customJsonbPhotos.default([]),
  amenities: customJsonbAmenities.default([
    {
      name: 'Wifi',
      i18n: 'wifi',
      exists: true
    },
    {
      name: 'Parking',
      i18n: 'parking',
      exists: true
    },
    {
      name: 'Kitchen',
      i18n: 'kitchen',
      exists: true
    },
    {
      name: 'TV',
      i18n: 'tv',
      exists: true
    },
    {
      name: 'Washer',
      i18n: 'washer',
      exists: true
    },
    {
      name: 'Dryer',
      i18n: 'dryer',
      exists: true
    },
    {
      name: 'Heating',
      i18n: 'heating',
      exists: true
    },
    {
      name: 'Air Conditioning',
      i18n: 'airConditioning',
      exists: true
    },
    {
      name: 'Iron',
      i18n: 'iron',
      exists: true
    },
    {
      name: 'Hair Dryer',
      i18n: 'hairDryer',
      exists: true
    },
    {
      name: 'Smoke Detector',
      i18n: 'smokeDetector',
      exists: true
    },
    {
      name: 'Carbon Monoxide Detector',
      i18n: 'carbonMonoxideDetector',
      exists: true
    },
    {
      name: 'First Aid Kit',
      i18n: 'firstAidKit',
      exists: true
    },
    {
      name: 'Fire Extinguisher',
      i18n: 'fireExtinguisher',
      exists: true
    }
  ]),
  services: customJsonbServices.default([
    {
      name: 'Airport Shuttle',
      i18n: 'airportShuttle',
      exists: true
    },
    {
      name: 'Breakfast',
      i18n: 'breakfast',
      exists: true
    },
    {
      name: 'Elevator',
      i18n: 'elevator',
      exists: true
    },
    {
      name: 'Gym',
      i18n: 'gym',
      exists: true
    },
    {
      name: 'Hot Tub',
      i18n: 'hotTub',
      exists: true
    },
    {
      name: 'Pool',
      i18n: 'pool',
      exists: true
    },
    {
      name: 'Spa',
      i18n: 'spa',
      exists: true
    },
    {
      name: 'Parking',
      i18n: 'parking',
      exists: true
    },
    {
      name: 'Pets Allowed',
      i18n: 'petsAllowed',
      exists: true
    },
    {
      name: 'Smoking Allowed',
      i18n: 'smokingAllowed',
      exists: true
    },
    {
      name: 'Events Allowed',
      i18n: 'eventsAllowed',
      exists: true
    },
    {
      name: 'Wheelchair Accessible',
      i18n: 'wheelchairAccessible',
      exists: true
    }
  ]),
  sleepingArrangement: customJsonbSleepingArrangements.default([
    {
      bedrooom: 1,
      kingSizeBeds: 1,
      queenSizeBeds: 0,
      doubleSizeBeds: 0,
      singleSizeBeds: 0,
      sofaBeds: 0,
      bunkBeds: 0,
      futons: 0,
      hammocks: 0,
      airMattresses: 0,
      cribs: 1
    },
    {
      bedrooom: 2,
      kingSizeBeds: 0,
      queenSizeBeds: 1,
      doubleSizeBeds: 0,
      singleSizeBeds: 0,
      sofaBeds: 0,
      bunkBeds: 0,
      futons: 0,
      hammocks: 0,
      airMattresses: 0,
      cribs: 0
    },
    {
      bedrooom: 3,
      kingSizeBeds: 0,
      queenSizeBeds: 2,
      doubleSizeBeds: 0,
      singleSizeBeds: 0,
      sofaBeds: 0,
      bunkBeds: 0,
      futons: 0,
      hammocks: 0,
      airMattresses: 0,
      cribs: 0
    }
  ]),
  generalRules: text('generalRules'),
  safetyRules: text('safetyRules'),
  cancellationPolicy: text('cancellationPolicy'),
  checkIn: varchar('checkIn', { length: 50 }),
  checkOut: varchar('checkOut', { length: 50 }),
  active: boolean('active').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Property = typeof property
export type PropertyFields = typeof property.$inferSelect
export type { Amenity, Amenities}
