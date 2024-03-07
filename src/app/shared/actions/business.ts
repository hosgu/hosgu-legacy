'use server'
import BusinessService from '~/app/shared/services/business'
import { APIResponse } from '~/types'

export const getOne = async (userId: string): Promise<APIResponse<any>> => {
  const business = await BusinessService.getOne({
    endpoint: `business/user/${userId}`
  })

  return business
}
