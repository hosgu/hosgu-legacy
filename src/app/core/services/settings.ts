import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('settings')
  }
}

const settingsService = new Service()

export default settingsService
