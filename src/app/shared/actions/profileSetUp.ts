import setUpProfileService from '../services/profileSetup'

export const setUpProfile = async (propertyData: any) => {
  const response = await setUpProfileService.setUpProfile(propertyData)
  return response
}
