import security from '@architecturex/utils.security'

import CRUDHandler from '../../CRUD'
import { Guest, guest } from '../../../db/schemas/guest'
import { DB } from '../../../db'

class CRUD extends CRUDHandler<Guest> {
  constructor(db: DB) {
    super(db, guest)
  }

  async getAll(
    page: number,
    size: number,
    limit: boolean,
    cache: boolean,
    params: any
  ): Promise<any> {
    const { businessId = '' } = params

    if (!businessId) {
      throw {
        type: 'BAD_REQUEST_ERROR',
        code: 'MISSING_BUSINESS_ID',
        message: 'missingBusinessId'
      }
    }

    const data = await this.db
      .select()
      .from(this.table)
      .where(this.sql`"businessId" = ${businessId}`)
      .limit(size)
      .offset((page - 1) * size)

    if (data.length === 0) {
      throw {
        type: 'NOT_FOUND_ERROR',
        code: 'NO_ITEM_FOUND',
        message: 'noItemFound'
      }
    }

    return {
      checksum: security.password.encrypt(String(data.length)),
      items: data
    }
  }
}

export default CRUD
