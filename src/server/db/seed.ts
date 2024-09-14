import { desc } from 'drizzle-orm'
import { db } from '../db'
import { user } from './schemas/user'
import { business } from './schemas/business'

async function seed() {
  const users = await db.select().from(user)

  if (users.length === 0) {
    await db.insert(user).values({
      tier: 'free',
      role: 'global.god',
      email: 'test1@gmail.com',
      password: '16249809f34c1b88ce1bdeb3d392c7ab86f147bb', // Abc123456$
      fullName: 'Carlos Santana',
      phone: '+523123195612',
      avatar: '',
      birthday: '12/12/1989',
      website: 'https://ranchosanpancho.com',
      code: '1234567890',
      active: false
    })

    const [userData] = await db.select().from(user).orderBy(desc(user.createdAt)).limit(1)

    await db.insert(business).values({
      userId: userData.id,
      name: 'Cabañas San Test',
      slug: 'cabanas-san-test',
      email: 'test@gmail.com',
      phone: '+523123195612',
      priceRange: '$$',
      website: 'https://ranchosanpancho.com',
      facebook: 'https://www.facebook.com/RanchoSanPancho/',
      instagram: 'https://www.instagram.com/ranchosanpancho/',
      logo: 'https://ranchosanpancho.com/logo.png',
      rating: 5,
      addressLine1: 'Calle Hidalgo 1',
      addressLine2: 'Centro',
      city: 'Colima',
      state: 'Colima',
      country: 'Mexico',
      zipCode: '63729',
      active: true
    })

    await db.insert(user).values({
      tier: 'free',
      role: 'global.god',
      email: 'test2@gmail.com',
      password: '16249809f34c1b88ce1bdeb3d392c7ab86f147bb', // Abc123456$
      fullName: 'Carlos Santana',
      phone: '+523123195613',
      avatar: '',
      birthday: '12/12/1989',
      website: 'https://ranchosanpancho.com',
      code: '0123456789',
      active: true
    })

    const [userData2] = await db.select().from(user).orderBy(desc(user.createdAt)).limit(1)

    await db.insert(business).values({
      userId: userData2.id,
      name: 'Cabañas San Test 2',
      slug: 'cabanas-san-test-2',
      email: 'test2@gmail.com',
      phone: '+523123195613',
      priceRange: '$$',
      website: 'https://ranchosanpancho.com',
      facebook: 'https://www.facebook.com/RanchoSanPancho/',
      instagram: 'https://www.instagram.com/ranchosanpancho/',
      logo: 'https://ranchosanpancho.com/logo.png',
      rating: 5,
      addressLine1: 'Calle Hidalgo 1',
      addressLine2: 'Centro',
      city: 'Colima',
      state: 'Colima',
      country: 'Mexico',
      zipCode: '63729',
      active: true
    })
  }

  console.log('Seed completed')

  process.exit()
}

seed()
