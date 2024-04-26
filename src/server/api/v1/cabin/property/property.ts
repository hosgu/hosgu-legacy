import CRUDHandler from '../../../CRUD'
import { PropertyCabin, propertyCabin } from '../../../../db/schemas/propertyCabin'
import { DB } from '../../../../db'

class CRUD extends CRUDHandler<PropertyCabin> {
  constructor(db: DB) {
    super(db, propertyCabin)
  }
}

export default CRUD
