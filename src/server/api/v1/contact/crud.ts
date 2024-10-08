import CRUDHandler from '../../CRUD'
import { Contact, contact } from '../../../db/schemas/contact'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Contact> {
  constructor(db: DB) {
    super(db, contact)
  }
}

export default CRUD
