import CRUDHandler from '../../CRUD'
import { Arrangement, arrangement } from '../../../db/schemas/arrangement'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Arrangement> {
  constructor(db: DB) {
    super(db, arrangement)
  }
}

export default CRUD
