import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('unit')
  }
}

const unitService = new Service()

export default unitService
