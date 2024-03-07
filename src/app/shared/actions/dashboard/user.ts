'use server'
import core from '@architecturex/utils.core'
import UserService from '~/app/shared/services/dashboard/user'
import { APIResponse } from '~/types'

export const getAllUsers = async () => {
  const response = await UserService.getAll()
  return response
}

export const deleteUser = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await UserService.delete(id)

  return response
}
