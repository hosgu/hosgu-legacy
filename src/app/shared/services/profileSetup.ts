import { APIResponse } from '~/types'
import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('profileSetup')
  }

  async setUpProfile(propertyData: any): Promise<any> {}
}

const setUpProfileService = new Service()

export default setUpProfileService
