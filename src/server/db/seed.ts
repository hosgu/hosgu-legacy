import { db } from '../db'
import { user } from './schemas/user'
import { business } from './schemas/business'
import { amenity } from './schemas/amenity'
import { service } from './schemas/service'
import { fee } from './schemas/fee'
import { arrangement } from './schemas/arrangement'
import { property } from './schemas/property'
import { unit } from './schemas/unit'

async function seed() {
  const users = await db.select().from(user)

  if (users.length === 0) {
    await db.insert(user).values({
      tier: 'free',
      role: 'business.admin',
      email: 'cabanassanpancho@gmail.com',
      password: '16249809f34c1b88ce1bdeb3d392c7ab86f147bb', // Abc123456$
      fullName: 'Carlos Santana',
      phone: '+523123195612',
      avatar: '',
      birthday: '12/12/1989',
      website: 'https://ranchosanpancho.com',
      code: '123456890',
      active: true
    })

    const [userData] = await db.select().from(user)

    await db.insert(business).values({
      userId: userData.id,
      name: 'Cabañas San Pancho',
      slug: 'cabanas-san-pancho',
      email: 'cabanassanpancho@gmail.com',
      phone: '+523123195612',
      priceRange: '$$',
      website: 'https://ranchosanpancho.com',
      facebook: 'https://www.facebook.com/RanchoSanPancho/',
      instagram: 'https://www.instagram.com/ranchosanpancho/',
      logo: 'https://ranchosanpancho.com/logo.png',
      raiting: 5,
      addressLine1: 'Calle Hidalgo 1',
      addressLine2: 'Centro',
      city: 'Colima',
      state: 'Colima',
      country: 'Mexico',
      zipCode: '63729',
      active: true
    })

    const [businessData] = await db.select().from(business)

    await db.insert(amenity).values({
      ac: true,
      fireExtinguisher: true,
      firePit: true,
      firstAidKit: true,
      freeParking: true,
      fridge: true,
      hammocks: true,
      kitchen: true,
      lakeAccess: true,
      outdoorDiningArea: true,
      outdoorShower: true,
      patio: true,
      pool: true,
      tv: true,
      wheelchairAccessible: true,
      wifi: true
    })

    const [amenityData] = await db.select().from(amenity)

    await db.insert(service).values({
      housekeeping: true,
      restaurant: true
    })

    const [serviceData] = await db.select().from(service)

    await db.insert(arrangement).values({
      bedrooms: 3,
      cribs: 1,
      hammocks: 3,
      kingSizeBeds: 1,
      queenSizeBeds: 6,
      sofaBeds: 1
    })

    const [arrangementData] = await db.select().from(arrangement)

    await db.insert(property).values({
      businessId: businessData.id,
      amenityId: amenityData.id,
      serviceId: serviceData.id,
      arrangementId: arrangementData.id,
      typeOfBuilding: 'cabin',
      typeOfPlace: 'entire',
      name: 'Cabaña 1',
      slug: 'cabana-1',
      description: 'Description of Cabaña 1',
      floors: 1,
      rooms: 3,
      generalRules: 'General rules for the property',
      safetyRules: 'Safety rules for the property',
      cancellationPolicy: 'Cancellation policy details',
      checkIn: '15:00',
      checkOut: '12:00',
      active: true
    })

    const [propertyData] = await db.select().from(property)

    await db.insert(fee).values({
      cleaningFee: 0,
      emergencyOfferFee: 0,
      extraBedFee: 0,
      extraGuestFee: 0,
      highestFee: 0,
      initialOfferFee: 0,
      lowestFee: 0,
      secondOfferFee: 0,
      securityDepositFee: 0,
      weekdayFee: 0,
      weekendFee: 0
    })

    const [feeData] = await db.select().from(fee)

    await db.insert(unit).values({
      propertyId: propertyData.id,
      feeId: feeData.id,
      maxGuests: 6,
      minGuests: 1,
      insideBathrooms: 1,
      outsideBathrooms: 0
    })
  }

  console.log('Seed completed')

  process.exit()
}

seed()
