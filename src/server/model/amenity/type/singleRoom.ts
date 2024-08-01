import Property from '../property'
import { Amenity } from '../property'

class SingleRoom extends Property {
  constructor(data: Partial<Amenity>) {
    super(data)
  }
}

export default SingleRoom
