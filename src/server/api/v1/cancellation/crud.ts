import CRUDHandler from '../../CRUD'
import { Cancellation, cancellation } from '../../../db/schemas/cancellation'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Cancellation> {
  constructor(db: DB) {
    super(db, cancellation)
  }
}

export default CRUD
