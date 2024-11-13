'use server'
import core from '@architecturex/utils.core'
import security from '@architecturex/utils.security'

import SettingService from '~/app/core/services/setting'
import { APIResponse, Token, CreatedItem } from '~/types'

export const getOne = async (userId: string) => {
  const response = await SettingService.getOne({ endpoint: `setting/${userId}` })
  return response
}
