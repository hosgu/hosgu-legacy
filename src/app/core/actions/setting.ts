'use server'
import core from '@architecturex/utils.core'
import security from '@architecturex/utils.security'

import SettingService from '~/app/core/services/setting'
import { APIResponse, Token, CreatedItem } from '~/types'

export const getBy = async (userId: string) => {
  const response = await SettingService.getBy({ endpoint: `setting/by/userId/${userId}` })
  return response
}
