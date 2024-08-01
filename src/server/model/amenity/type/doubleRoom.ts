import Property from '../property'
import { Amenity } from '../property'

class DoupleRoom extends Property {
  constructor(data: Partial<Amenity>) {
    super(data)
  }
}

export default DoupleRoom
