import CRUDHandler from '../../CRUD'
import { Tier, tier } from '../../../db/schemas/tier'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Tier> {
  constructor(db: DB) {
    super(db, tier)
  }
}

export default CRUD
