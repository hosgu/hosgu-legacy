import CRUDHandler from '../../CRUD'
import { Amenity, amenity } from '../../../db/schemas/amenity'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Amenity> {
  constructor(db: DB) {
    super(db, amenity)
  }
}

export default CRUD
