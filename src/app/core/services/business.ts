import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('business')
  }
}

const businessService = new Service()

export default businessService
