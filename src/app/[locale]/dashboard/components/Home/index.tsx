'use client'
import React, { FC } from 'react'

import { events } from './fakeData'
import Calendar from '~components/Calendar'
import Card from '~/components/Card'
import Money from '~/app/components/SVG/Money'

const Home: FC = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <Card
          svg={<Money />}
          title="Number of reservations"
          content={<h2 className="m-0 p-0">30</h2>}
        />
        <Card svg={<Money />} title="Number of guests" content={<h2 className="m-0 p-0">30</h2>} />
        <Card svg={<Money />} title="Number of cabins" content={<h2 className="m-0 p-0">30</h2>} />
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
