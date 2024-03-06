import CRUDHandler from '../../CRUD'
import { Reservation, reservation } from '../../../db/schemas/reservation'
import { estate } from '../../../db/schemas/estate'
import { property } from '../../../db/schemas/property'
import { DB } from '../../../db'
import { eq } from 'drizzle-orm'
import { DataResponse, ItemData } from '~/server/api/types'
import { GuestFields } from '~/server/db/schemas/guest'

class CRUD extends CRUDHandler<Reservation> {
  constructor(db: DB) {
    super(db, reservation)
  }

  async getByGuestId(id: GuestFields['id']): Promise<DataResponse<ItemData>> {
    const data = await this.db.select().from(this.table).where(eq(this.table.guestId, id))

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

  async getByIdForCard(id: string): Promise<DataResponse<ItemData>> {
    const selectFromReservation = {
      id: this.table.id,
      startDate: this.table.startDate,
      endDate: this.table.endDate,
      estateId: this.table.estateId,
      occupancy: this.table.occupancy,
      extraOccupancy: this.table.extraOccupancy,
      createdAt: this.table.createdAt
    }

    const selectFromProperty = {
      type: property.type,
      name: property.name,
      checkIn: property.checkIn,
      checkOut: property.checkOut,
      amenities: property.amenities
    }

    const data = await this.db
      .select({ reservation: selectFromReservation, property: selectFromProperty })
      .from(this.table)
      .innerJoin(estate, eq(this.table.estateId, estate.id))
      .innerJoin(property, eq(property.id, estate.propertyId))
      .where(eq(this.table.id, id))

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
