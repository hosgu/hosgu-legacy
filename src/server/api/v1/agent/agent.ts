import CRUDHandler from '../../CRUD'
import { Agent, agent } from '../../../db/schemas/agent'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Agent> {
  constructor(db: DB) {
    super(db, agent)
  }
}

export default CRUD
