import CRUDHandler from '../../CRUD'
import { Asset, asset } from '../../../db/schemas/asset'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Asset> {
  constructor(db: DB) {
    super(db, asset)
  }
}

export default CRUD
