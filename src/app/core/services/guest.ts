import api from '@architecturex/utils.api'

import { APIResponse } from '~/types'
import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('guest')
  }

  async getAll(endpoint = '', businessId = ''): Promise<any> {
    const response = await api.fetch<APIResponse<any>>(
      `${process.env.API_URL}/api/v1/${endpoint || this.endpoint}`,
      {
        method: 'GET',
        headers: {
          'x-headers-params': JSON.stringify({
            businessId: businessId
          })
        }
      }
    )
    return response
  }
}

const guestService = new Service()

export default guestService
