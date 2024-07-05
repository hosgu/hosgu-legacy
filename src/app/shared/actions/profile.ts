'use server'
import core from '@architecturex/utils.core'

import { APIResponse } from '~/types'
import ProfileService from '../services/profile'

export const setupProfile = async (e: FormData): Promise<APIResponse<any>> => {
  const data = core.formData.get(e)
  console.log('Profile Data ===>', data)
  const response = await ProfileService.setup(data)

  return response
}
