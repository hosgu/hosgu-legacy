import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('setting')
  }
}

const settingService = new Service()

export default settingService
