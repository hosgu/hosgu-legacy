import CRUDHandler from '../../CRUD'
import { ASR, asrTbl } from '../../../db/schemas/asr'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<ASR> {
  constructor(db: DB) {
    super(db, asrTbl)
  }
}

export default CRUD
