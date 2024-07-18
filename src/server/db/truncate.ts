import { sql } from 'drizzle-orm'
import { db } from '../db'

const clearDb = async (): Promise<void> => {
  await db.execute(sql.raw(`TRUNCATE TABLE "agent" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "asr" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "asset" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "business" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "cancellation" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "commission" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "employee" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "fee" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "guest" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "housekeeping" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "invoice" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "photo" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "property" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "reservation" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "room" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "setting" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "tier" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "unit" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "user" CASCADE;`))

  console.log('Database cleared')

  process.exit()
}

clearDb()
