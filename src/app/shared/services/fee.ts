import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('fee')
  }
}

const feeService = new Service()

export default feeService
