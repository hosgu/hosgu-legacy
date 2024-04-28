import CRUDHandler from '../../CRUD'
import { Unit, unit } from '../../../db/schemas/unit'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Unit> {
  constructor(db: DB) {
    super(db, unit)
  }
}

export default CRUD
