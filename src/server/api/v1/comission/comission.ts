import CRUDHandler from '../../CRUD'
import { Comission, comission } from '../../../db/schemas/comissions'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Comission> {
  constructor(db: DB) {
    super(db, comission)
  }
}

export default CRUD
