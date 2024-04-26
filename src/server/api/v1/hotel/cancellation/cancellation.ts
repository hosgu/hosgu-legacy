import CRUDHandler from '../../../CRUD'
import { CancellationHotel, cancellationHotel } from '../../../../db/schemas/cancellationHotel'
import { DB } from '../../../../db'

class CRUD extends CRUDHandler<CancellationHotel> {
  constructor(db: DB) {
    super(db, cancellationHotel)
  }
}

export default CRUD
