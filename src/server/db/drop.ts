import { sql } from 'drizzle-orm'
import { db } from '../db' // Ensure the path is correct

const dropAllTables = async (): Promise<void> => {
  try {
    // Execute the query to get the names of all tables in the 'public' schema
    const tables = await db.execute(
      sql.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `)
    )

    // Iterate over each row returned in the result
    for (const row of tables) {
      const tableName = row['tablename'] as string // Ensure the table name is handled as a string
      // Execute the command to drop the table with the CASCADE option
      await db.execute(sql.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE;`))
      console.log(`Table ${tableName} dropped.`)
    }

    console.log('All tables dropped successfully.')
  } catch (error) {
    console.error('Error dropping tables:', error)
  } finally {
    // Ensure the process exits after execution
    process.exit()
  }
}

dropAllTables()
