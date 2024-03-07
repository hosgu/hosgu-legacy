import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('reservation')
  }
}

const reservationService = new Service()

export default reservationService
