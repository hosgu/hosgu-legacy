import { TableConfig, Column } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'
import is from '@architecturex/utils.is'
import security from '@architecturex/utils.security'
import { DB, sql, SQL } from '../db'
import { DataResponse, ItemData } from './types'

type TableColumns = {
  [key: string]: any
}

class CRUD<T extends PgTable<TableConfig>> {
  protected db: DB
  protected sql: SQL
  protected table: T
  protected fields?: string
  public selectedFields: TableColumns

  // Dependency Injection
  constructor(db: DB, table: T, fields: string = '') {
    this.db = db
    this.sql = sql
    this.table = table
    this.fields = fields
    this.selectedFields = {}

    this.initializeFields()
  }

  initializeFields() {
    this.selectedFields = this.selectFields(this.fields || '', this.table)
  }

  selectFields<T extends PgTable<TableConfig<Column<any, object, object>>> & TableColumns>(
    fields: string,
    table: T
  ) {
    if (!fields) {
      return {}
    }

    const fieldsArray = fields.split(',')

    const selectionFields = fieldsArray.reduce((acc, fieldName) => {
      const column = table[fieldName as keyof TableColumns]

      if (column) {
        acc[fieldName] = column
      }

      return acc
    }, {} as TableColumns)

    return selectionFields
  }

  async getAll(
    page: number = 1,
    size: number = 10,
    limit = false,
    cache = false
  ): Promise<DataResponse<any>> {
    if (cache) {
      // TODO: Add cache layer with Redis.
      // const cachedData = redisClient.get(this.table)
      // return {
      //   cache: true,
      //   items: data,
      //   pagination: {
      //     totalItems,
      //     totalPages,
      //     currentPage: page,
      //     pageSize: size
      //   }
      // }
    }

    const [countData] = await this.db
      .select({ count: this.sql<number>`cast(count(*) as int)` })
      .from(this.table)

    const totalItems = countData.count
    const totalPages = Math.ceil(totalItems / size)

    let data = []

    if (limit) {
      data = await this.db
        .select()
        .from(this.table)
        .limit(size)
        .offset((page - 1) * size)
    } else {
      data = await this.db.select().from(this.table)
    }

    if (data.length === 0) {
      throw {
        type: 'NOT_FOUND_ERROR',
        code: 'NO_ITEMS_FOUND',
        message: 'error.message.noItemsFound'
      }
    }

    return {
      checksum: security.password.encrypt(JSON.stringify(data)),
      items: data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: size
      }
    }
  }

  async getOne(id: string, cache = false): Promise<DataResponse<ItemData>> {
    const data = await this.db
      .select()
      .from(this.table)
      .where(this.sql`id = ${id}`)

    if (data.length === 0) {
      throw {
        type: 'NOT_FOUND_ERROR',
        code: 'NO_ITEM_FOUND',
        message: 'noItemFound'
      }
    }

    return {
      items: data
    }
  }

  async create(itemData: any): Promise<DataResponse<ItemData>> {
    let data: any[] = []
    if (is(itemData).array()) {
      itemData.forEach(async (item: any) => {
        let itemSaved = await this.db.insert(this.table).values(item).returning()
        data.push(itemSaved)
      })
    } else {
      data = await this.db.insert(this.table).values(itemData).returning()
    }

    return {
      items: data
    }
  }

  async update(id: string, itemData: any): Promise<DataResponse<ItemData>> {
    const data = await this.db
      .update(this.table)
      .set(itemData)
      .where(this.sql`id = ${id}`)
      .returning()

    if (data.length === 0) {
      throw {
        type: 'NOT_FOUND_ERROR',
        code: 'NO_ITEM_FOUND',
        message: 'noItemFound'
      }
    }

    return {
      items: data
    }
  }

  async delete(id: string): Promise<DataResponse<ItemData>> {
    await this.db.delete(this.table).where(this.sql`id = ${id}`)

    return {
      items: [
        {
          id
        }
      ]
    }
  }
}

export default CRUD
