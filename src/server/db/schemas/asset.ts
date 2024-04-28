import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { room } from './room'
import { unit } from './unit'

export const asset = pgTable('asset', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('roomId').references(() => room.id),
  unitId: uuid('unitId').references(() => unit.id),
  assetType: varchar('assetType', { length: 100 }), // room or unit
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Asset = typeof asset
export type AssetFields = typeof asset.$inferSelect
