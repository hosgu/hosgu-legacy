import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('tier')
  }
}

const tierService = new Service()

export default tierService
