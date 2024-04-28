import CRUDHandler from '../../CRUD'
import { Employee, employee } from '../../../db/schemas/employee'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Employee> {
  constructor(db: DB) {
    super(db, employee)
  }
}

export default CRUD
