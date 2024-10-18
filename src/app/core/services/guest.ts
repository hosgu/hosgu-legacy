import api from '@architecturex/utils.api'
import cookies from '@architecturex/utils.cookies'

import { APIResponse } from '~/types'
import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('guest')
  }

  async getAll({ endpoint, businessId }: { endpoint?: string; businessId: string }): Promise<any> {
    const headers = {
      'x-params': JSON.stringify({
        businessId
      })
    }

    const response = await api.fetch<APIResponse<any>>(
      `${process.env.API_URL}/api/v1/${endpoint || this.endpoint}`,
      {
        method: 'GET',
        headers
      }
    )

    return response
  }
}

const guestService = new Service()

export default guestService
