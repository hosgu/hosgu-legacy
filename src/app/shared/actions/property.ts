import { getPropertyById } from '~/app/shared/services/property'

export async function getPropertyByIdServerAction(id: string) {
  const response = await getPropertyById(id)
  return response
}
