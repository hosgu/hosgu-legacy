'use server'
import { getAllUsers } from '~/app/shared/services/dashboard/users'

export const getAllUsersServerAction = async () => {
  const response = await getAllUsers()
  return response
}
