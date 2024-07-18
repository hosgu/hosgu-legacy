import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('agent')
  }
}

const agentService = new Service()

export default agentService
