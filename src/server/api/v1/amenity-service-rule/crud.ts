import CRUDHandler from '../../CRUD'
import { AmenityServiceRule, amenityServiceRule } from '../../../db/schemas/amenityServiceRule'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<AmenityServiceRule> {
  constructor(db: DB) {
    super(db, amenityServiceRule)
  }
}

export default CRUD
