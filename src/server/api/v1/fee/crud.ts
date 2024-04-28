import CRUDHandler from '../../CRUD'
import { Fee, fee } from '../../../db/schemas/fee'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Fee> {
  constructor(db: DB) {
    super(db, fee)
  }
}

export default CRUD
