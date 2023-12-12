import type { Config } from 'drizzle-kit'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env
const connectionString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

export default {
  schema: './src/server/db/schemas/*',
  out: './src/server/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString
  }
} satisfies Config
