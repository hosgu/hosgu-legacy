import CRUDHandler from '../../CRUD'
import { Estate, estate } from '../../../db/schemas/estate'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Estate> {
  constructor(db: DB) {
    super(db, estate)
  }
}

export default CRUD
