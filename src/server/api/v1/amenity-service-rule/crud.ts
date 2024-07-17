import CRUDHandler from '../../CRUD'
import { ASR, asr } from '../../../db/schemas/asr'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<ASR> {
  constructor(db: DB) {
    super(db, asr)
  }
}

export default CRUD
