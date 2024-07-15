import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('amenity-service-rule')
  }
}

const amenityServiceRule = new Service()

export default amenityServiceRule
