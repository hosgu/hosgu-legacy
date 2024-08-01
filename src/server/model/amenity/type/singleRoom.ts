import Property from '../property'
import { ASR } from '../property'

class SingleRoom extends Property {
  constructor(data: Partial<ASR>) {
    super(data)
  }
}

export default SingleRoom
