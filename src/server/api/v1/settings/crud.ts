import CRUDHandler from '../../CRUD'
import { Setting, setting } from '../../../db/schemas/setting'
import { DB, sql } from '../../../db'
import { DataResponse, ItemData } from '../../types'
import { eq } from 'drizzle-orm'

class CRUD extends CRUDHandler<Setting> {
  constructor(db: DB) {
    super(db, setting)
  }
}

export default CRUD
