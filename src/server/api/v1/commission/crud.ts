import CRUDHandler from '../../CRUD'
import { Commission, commission } from '../../../db/schemas/commission'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Commission> {
  constructor(db: DB) {
    super(db, commission)
  }
}

export default CRUD
