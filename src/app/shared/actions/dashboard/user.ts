'use server'
import core from '@architecturex/utils.core'
import { getAllUsers, deleteRow } from '~/app/shared/services/dashboard/users'
import { APIResponse } from '~/types'

export const getAllUsersServerAction = async () => {
  const response = await getAllUsers()
  return response
}

export const deleteUserServerAction = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await deleteRow(id)

  return response
}
