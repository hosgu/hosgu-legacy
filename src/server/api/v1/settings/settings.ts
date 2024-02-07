import CRUDHandler from '../../CRUD'
import { Setting, setting } from '../../../db/schemas/setting'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Setting> {
  constructor(db: DB) {
    super(db, setting)
  }
}

export default CRUD
