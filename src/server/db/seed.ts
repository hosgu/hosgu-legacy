import { db } from '../db'
import { user } from './schemas/user'
import { business } from './schemas/business'
import { property } from './schemas/property'
import { estate } from './schemas/estate'

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
      type: 'cabin',
      name: 'Cabañas San Pancho',
      slug: 'cabanas-san-pancho',
      email: 'cabanassanpancho@gmail.com',
      phone: '+523123195612',
      priceRange: '$$$',
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

    await db.insert(property).values({
      businessId: businessData.id,
      type: 'cabin',
      name: 'Cabaña 1',
      slug: 'cabana-1',
      description: 'Description of Cabaña 1',
      floors: 1,
      rooms: 2,
      photos: [],
      amenities: [
        {
          name: 'Wifi',
          i18n: 'wifi',
          exists: true
        },
        {
          name: 'Parking',
          i18n: 'parking',
          exists: true
        },
        {
          name: 'Kitchen',
          i18n: 'kitchen',
          exists: true
        },
        {
          name: 'TV',
          i18n: 'tv',
          exists: true
        },
        {
          name: 'Washer',
          i18n: 'washer',
          exists: true
        },
        {
          name: 'Dryer',
          i18n: 'dryer',
          exists: true
        },
        {
          name: 'Heating',
          i18n: 'heating',
          exists: true
        },
        {
          name: 'Air Conditioning',
          i18n: 'airConditioning',
          exists: true
        },
        {
          name: 'Iron',
          i18n: 'iron',
          exists: true
        },
        {
          name: 'Hair Dryer',
          i18n: 'hairDryer',
          exists: true
        },
        {
          name: 'Smoke Detector',
          i18n: 'smokeDetector',
          exists: true
        },
        {
          name: 'Carbon Monoxide Detector',
          i18n: 'carbonMonoxideDetector',
          exists: true
        },
        {
          name: 'First Aid Kit',
          i18n: 'firstAidKit',
          exists: true
        },
        {
          name: 'Fire Extinguisher',
          i18n: 'fireExtinguisher',
          exists: true
        }
      ],
      services: [
        {
          name: 'Airport Shuttle',
          i18n: 'airportShuttle',
          exists: true
        },
        {
          name: 'Breakfast',
          i18n: 'breakfast',
          exists: true
        },
        {
          name: 'Elevator',
          i18n: 'elevator',
          exists: true
        },
        {
          name: 'Gym',
          i18n: 'gym',
          exists: true
        },
        {
          name: 'Hot Tub',
          i18n: 'hotTub',
          exists: true
        },
        {
          name: 'Pool',
          i18n: 'pool',
          exists: true
        },
        {
          name: 'Spa',
          i18n: 'spa',
          exists: true
        },
        {
          name: 'Parking',
          i18n: 'parking',
          exists: true
        },
        {
          name: 'Pets Allowed',
          i18n: 'petsAllowed',
          exists: true
        },
        {
          name: 'Smoking Allowed',
          i18n: 'smokingAllowed',
          exists: true
        },
        {
          name: 'Events Allowed',
          i18n: 'eventsAllowed',
          exists: true
        },
        {
          name: 'Wheelchair Accessible',
          i18n: 'wheelchairAccessible',
          exists: true
        }
      ],
      sleepingArrangement: [
        {
          bedrooom: 1,
          kingSizeBeds: 1,
          queenSizeBeds: 0,
          doubleSizeBeds: 0,
          singleSizeBeds: 0,
          sofaBeds: 0,
          bunkBeds: 0,
          futons: 0,
          hammocks: 0,
          airMattresses: 0,
          cribs: 1
        },
        {
          bedrooom: 2,
          kingSizeBeds: 0,
          queenSizeBeds: 1,
          doubleSizeBeds: 0,
          singleSizeBeds: 0,
          sofaBeds: 0,
          bunkBeds: 0,
          futons: 0,
          hammocks: 0,
          airMattresses: 0,
          cribs: 0
        },
        {
          bedrooom: 3,
          kingSizeBeds: 0,
          queenSizeBeds: 2,
          doubleSizeBeds: 0,
          singleSizeBeds: 0,
          sofaBeds: 0,
          bunkBeds: 0,
          futons: 0,
          hammocks: 0,
          airMattresses: 0,
          cribs: 0
        }
      ],
      generalRules: 'General rules for the property',
      safetyRules: 'Safety rules for the property',
      cancellationPolicy: 'Cancellation policy details',
      checkIn: '15:00',
      checkOut: '12:00',
      active: true
    })

    const [propertyData] = await db.select().from(property)

    await db.insert(estate).values({
      propertyId: propertyData.id,
      type: 'cabin',
      floor: '1',
      roomNumber: '1',
      roomType: 'private',
      insideBathrooms: 1,
      outsideBathrooms: 0,
      maxGuests: 6,
      minGuests: 1,
      cleaningFee: 0,
      extraGuestFee: 0,
      extraBedFee: 0,
      securityDepositFee: 0,
      weekendFee: 0,
      weekdayFee: 0,
      initialOfferFee: 0,
      secondOfferFee: 0,
      emergencyOfferFee: 0,
      highestFee: 0,
      lowestFee: 0,
      hasWifi: true,
      hasTv: true,
      hasNetflix: true,
      hasHeat: false,
      hasAc: false,
      hasIron: false,
      hasDesk: false,
      hasKitchen: true,
      hasCrib: true,
      isPetsAllowed: false,
      isSmokingAllowed: false
    })
  }

  console.log('Seed completed')

  process.exit()
}

seed()
