import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('amenity')
  }
}

const amenityService = new Service()

export default amenityService
