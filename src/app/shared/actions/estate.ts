import { getAllEstates, getEstateById } from '~/app/shared/services/estate'

export async function getAllEstatesServerAction(id: string) {
  const response = await getAllEstates()
  return response
}

export async function getEstateByIdServerAction(id: string) {
  const response = await getEstateById(id)
  return response
}
