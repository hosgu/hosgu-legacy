import CRUDHandler from '../../../CRUD'
import { ReservationHotel, reservationHotel } from '../../../../db/schemas/reservationHotel'
import { DB } from '../../../../db'
import { eq } from 'drizzle-orm'
import { DataResponse, ItemData } from '~/server/api/types'
import { GuestFields } from '~/server/db/schemas/guest'

class CRUD extends CRUDHandler<ReservationHotel> {
  constructor(db: DB) {
    super(db, reservationHotel)
  }

  async getByGuestId(id: GuestFields['id']): Promise<DataResponse<ItemData>> {
    const data = await this.db.select().from(this.table).where(eq(reservationHotel.guestId, id))

    if (data.length === 0) {
      throw {
        type: 'NOT_FOUND_ERROR',
        code: 'NO_ITEM_FOUND',
        message: 'noItemFound'
      }
    }

    return {
      items: data
    }
  }
}

export default CRUD
