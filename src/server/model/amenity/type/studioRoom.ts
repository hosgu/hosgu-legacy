import Property from '../property'
import { Amenity } from '../property'

class StudioRoom extends Property {
  constructor(data: Partial<Amenity>) {
    super(data)
  }
}

export default StudioRoom
