import CRUDHandler from '../../CRUD'
import { Photo, photo } from '../../../db/schemas/photo'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Photo> {
  constructor(db: DB) {
    super(db, photo)
  }
}

export default CRUD
