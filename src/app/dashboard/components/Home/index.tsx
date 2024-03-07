'use client'
import React, { FC } from 'react'
import SVG from '@architecturex/components.svg'

import Card from '~/components/Card'

const Home: FC = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <Card
          svg={<SVG.Money />}
          title="Number of reservations"
          content={<h2 className="m-0 p-0">30</h2>}
        />
        <Card
          svg={<SVG.Money />}
          title="Number of guests"
          content={<h2 className="m-0 p-0">30</h2>}
        />
        <Card
          svg={<SVG.Money />}
          title="Number of cabins"
          content={<h2 className="m-0 p-0">30</h2>}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Card title="Number of reservations" content={<h2 className="m-0 p-0">30</h2>} />
        <Card title="Number of reservations" content={<h2 className="m-0 p-0">30</h2>} />
        <Card title="Number of reservations" content={<h2 className="m-0 p-0">30</h2>} />
      </div>
    </div>
  )
}

export default Home
