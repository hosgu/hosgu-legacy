import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('property')
  }
}

const propertyService = new Service()

export default propertyService
