import { drizzle } from 'drizzle-orm/postgres-js'
import { sql as sqlQuery } from 'drizzle-orm'
import postgres from 'postgres'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env
const connectionString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

const queryClient = postgres(connectionString)

export const db = drizzle(queryClient, { logger: process.env.DB_DEBUG === 'true' })
export const sql = sqlQuery
export type SQL = typeof sql
export type DB = typeof db
