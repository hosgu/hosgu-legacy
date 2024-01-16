'use client'
import React, { FC, useState } from 'react'
import Calendar from '../../../../components/Calendar'

const Home: FC = () => {
  return (
    <div className="w-full">
      Home
      <Calendar view="desktop" key={`calendar-desktop`} events={[]} />
    </div>
  )
}

export default Home
