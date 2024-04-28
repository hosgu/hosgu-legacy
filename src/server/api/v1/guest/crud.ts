import CRUDHandler from '../../CRUD'
import { Guest, guest } from '../../../db/schemas/guest'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Guest> {
  constructor(db: DB) {
    super(db, guest)
  }
}

export default CRUD
