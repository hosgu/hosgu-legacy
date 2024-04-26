import CRUDHandler from '../../../CRUD'
import { CancellationCabin, cancellationCabin } from '../../../../db/schemas/cancellationCabin'
import { DB } from '../../../../db'

class CRUD extends CRUDHandler<CancellationCabin> {
  constructor(db: DB) {
    super(db, cancellationCabin)
  }
}

export default CRUD
