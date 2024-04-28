import CRUDHandler from '../../CRUD'
import { Room, room } from '../../../db/schemas/room'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Room> {
  constructor(db: DB) {
    super(db, room)
  }
}

export default CRUD
