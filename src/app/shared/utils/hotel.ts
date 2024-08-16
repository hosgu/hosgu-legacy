export type Room = {
  floor: number
  roomNumber: number
  type: string
}

export type Floor = {
  floor: number
  rooms: { count: number; type: string }[]
}

export const roomTypes = ['Single', 'Double', 'Penthouse', 'Studio', 'Deluxe']

export const floors = [{ floor: 1, rooms: [{ count: 5, type: 'Single' }] }]

export const generateRooms = (floors: Floor[]): Room[] => {
  const rooms: Room[] = []

  floors.forEach(({ floor, rooms: roomDetails }) => {
    let roomNumberOffset = 1

    roomDetails.forEach(({ count, type }) => {
      for (let room = 0; room < count; room++) {
        rooms.push({
          floor,
          roomNumber: floor * 100 + roomNumberOffset,
          type: type
        })

        roomNumberOffset++
      }
    })
  })

  return rooms
}

type RoomTypeCount = {
  count: number
  type: string
}

type FloorGroup = {
  floor: number
  rooms: RoomTypeCount[]
}

export function groupRoomsByFloor(rooms: Room[]): FloorGroup[] {
  const result: FloorGroup[] = []

  rooms.forEach((room) => {
    let floor = result.find((f) => f.floor === room.floor)
    if (!floor) {
      floor = { floor: room.floor, rooms: [] }
      result.push(floor)
    }

    let roomType = floor.rooms.find((r) => r.type === room.type)
    if (!roomType) {
      roomType = { count: 0, type: room.type }
      floor.rooms.push(roomType)
    }

    roomType.count++
  })

  return result
}
