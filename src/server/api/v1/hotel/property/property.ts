import CRUDHandler from '../../../CRUD'
import { PropertyHotel, propertyHotel } from '../../../../db/schemas/propertyHotel'
import { DB } from '../../../../db'

class CRUD extends CRUDHandler<PropertyHotel> {
  constructor(db: DB) {
    super(db, propertyHotel)
  }
}

export default CRUD
