import CRUDHandler from '../../CRUD'
import { Business, business } from '../../../db/schemas/business'
import { DB } from '../../../db'
import { getBusinessBy } from './actions'

class CRUD extends CRUDHandler<Business> {
  constructor(db: DB) {
    super(db, business)
  }

  async by(by: any): Promise<any> {
    try {
      console.log('BY===>', by)
      const business = await getBusinessBy(by)
      console.log('BUSINESS===>', business)
      if (business) {
        return {
          items: business
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default CRUD
