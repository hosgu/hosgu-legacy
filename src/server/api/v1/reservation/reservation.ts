import CRUDHandler from '../../CRUD'
import { Reservation, reservation } from '../../../db/schemas/reservation'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Reservation> {
  constructor(db: DB) {
    super(db, reservation)
  }
}

export default CRUD
