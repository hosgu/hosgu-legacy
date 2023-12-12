import { eq } from 'drizzle-orm'
import { business as businessTable } from '../../../db/schemas/business'
import { db } from '../../../db'

export const getBusinessBy = async (where: any): Promise<any> => {
  const response = await db
    .select()
    .from(businessTable)
    .where(eq(businessTable.userId, where.userId))

  if (response.length > 0) {
    return response
  } else {
    throw {
      type: 'NOT_FOUND_ERROR',
      code: 'NO_ITEM_FOUND',
      message: 'noItemFound'
    }
  }
}
