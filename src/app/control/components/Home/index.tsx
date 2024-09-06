'use client'
import React, { FC } from 'react'
import SVG from '@architecturex/components.svg'

import Card from '~/components/Card'

const Home: FC = () => {
  const style = <h2 className="dark:text-slate-300 m-0 p-0">30</h2>

  return (
    <div className="w-full ">
      <div className="flex justify-between  ">
        <Card svg={<SVG.Bed />} title="Number of reservations" content={style} />
        <Card svg={<SVG.Guests />} title="Number of guests" content={style} />
        <Card svg={<SVG.Cabin />} title="Number of cabins" content={style} />
      </div>

      <div className="flex justify-between mt-8">
        <Card svg={<SVG.Money />} title="Number of reservations" content={style} />
        <Card svg={<SVG.Money />} title="Number of reservations" content={style} />
        <Card svg={<SVG.Money />} title="Number of reservations" content={style} />
      </div>
    </div>
  )
}

export default Home
