import React, { FC } from 'react'
import Image from 'next/image'

const clientsData = [
  {
    name: 'Client 1',
    logo: '/images/clients/san-pancho.png'
  },
  {
    name: 'Client 2',
    logo: '/images/clients/san-pancho.png'
  }
]

const Clients: FC = () => (
  <div data-component="Clients" className="bg-white px-8 py-20 dark:bg-gray-700 dark:text-white">
    <h2 className="font-bold mb-10 text-3xl text-center dark:text-white">{t.ourTrustedClients}</h2>

    <div className="flex flex-wrap gap-6 justify-center">
      {clientsData.map((client) => (
        <div key={client.name} className="flex flex-col items-center p-4">
          <Image
            src={client.logo}
            alt={client.name}
            className="h-32 mb-4 object-cover rounded-full shadow-md w-32"
            width={128}
            height={128}
          />
          <h3 className="font-semibold text-xl">{client.name}</h3>
        </div>
      ))}
    </div>
  </div>
)

export default Clients
