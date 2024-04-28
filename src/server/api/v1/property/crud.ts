import CRUDHandler from '../../CRUD'
import { Property, property } from '../../../db/schemas/property'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Property> {
  constructor(db: DB) {
    super(db, property)
  }
}

export default CRUD
