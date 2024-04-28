import CRUDHandler from '../../CRUD'
import { Service, service } from '../../../db/schemas/service'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Service> {
  constructor(db: DB) {
    super(db, service)
  }
}

export default CRUD
