'use client'
import React, { FC, useEffect, useState } from 'react'

import cx from '@architecturex/utils.cx'
import dates from '@architecturex/utils.dates'

import SVG from '@architecturex/components.svg'

const data = {
  properties: [
    {
      name: 'Cabaña de Piedra',
      reservations: [
        {
          id: '32257a76-3c4f-4e22-87b7-0be3a90b7d1a',
          startDate: '2024-04-10',
          endDate: '2024-04-12',
          googleContactId: '00000000-0000-0000-78f5-19f68c49f05b',
          nights: 2,
          guests: 8,
          freeNights: 0,
          needCrib: false,
          pendingAmount: 0,
          reservationCost: 6000,
          deposit: false,
          canceled: false,
          note: 'Jacky Mendoza - Amiga de Pachely',
          fileName: '',
          reservationType: 'stone'
        }
      ]
    },
    {
      name: 'Cabaña Victoria',
      reservations: [
        {
          id: '32257a76-3c4f-4e22-87b7-0be3a90b7d1a',
          startDate: '2024-04-10',
          endDate: '2024-04-12',
          googleContactId: '00000000-0000-0000-78f5-19f68c49f05b',
          nights: 2,
          guests: 8,
          freeNights: 0,
          needCrib: false,
          pendingAmount: 0,
          reservationCost: 6000,
          deposit: false,
          canceled: false,
          note: 'Jacky Mendoza - Amiga de Pachely',
          fileName: '',
          reservationType: 'victoria'
        }
      ]
    },
    {
      name: 'Cabaña Vista del Río',
      reservations: [
        {
          id: '32257a76-3c4f-4e22-87b7-0be3a90b7d1a',
          startDate: '2024-04-10',
          endDate: '2024-04-12',
          googleContactId: '00000000-0000-0000-78f5-19f68c49f05b',
          nights: 2,
          guests: 8,
          freeNights: 0,
          needCrib: false,
          pendingAmount: 0,
          reservationCost: 6000,
          deposit: false,
          canceled: false,
          note: 'Jacky Mendoza - Amiga de Pachely',
          fileName: '',
          reservationType: 'river'
        }
      ]
    }
  ]
}

let translate = (text: string) => text
const today = new Date()

type Props = {
  properties?: any
  dateClick?: any
  t?: any
  splitter?: '-' | '/'
  view?: 'desktop' | 'mobile'
  locale?: string
}

const InlineCalendar: FC<Props> = ({ t, locale = 'en-US' }) => {
  const headerDatesArray = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date
  })

  if (t) {
    translate = t
  }

  const properties = data.properties

  const [currentDate, setCurrentDate] = useState(today)
  const [currentMonth, setCurrentMonth] = useState<any>(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [headerDates, setHeaderDates] = useState<Date[]>(headerDatesArray)

  const handleMoveBackTwoWeeks = () => {
    const newHeaderDates = headerDates.map((date) => {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() - 14)
      return newDate
    })

    setCurrentDate(newHeaderDates[0])
    setHeaderDates(newHeaderDates)
  }

  const handleMoveNextTwoWeeks = () => {
    const newHeaderDates = headerDates.map((date) => {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() + 14)
      return newDate
    })

    setCurrentDate(newHeaderDates[0])
    setHeaderDates(newHeaderDates)
  }

  return (
    <div className="w-[98%] ml-auto mr-auto">
      <header className="flex justify-center mt-4 mb-4 text-xl items-center">
        <SVG.Arrow direction="left" size={30} onClick={handleMoveBackTwoWeeks} />
        <span className="capitalize">
          {currentDate.getDate()} {translate(dates.months[currentDate.getMonth()].toLowerCase())}{' '}
          {currentDate.getFullYear()}
        </span>
        <SVG.Arrow direction="right" size={30} onClick={handleMoveNextTwoWeeks} />
      </header>

      <table className="border border-gray-400 w-full text-xs">
        <thead className="bg-white border-b border-gray-400 text-[10px] font-normal">
          <tr>
            <th className="border-r border-gray-400 text-xs">Properties</th>

            {headerDates.map((date, index) => {
              const day = date.toLocaleString(locale, { weekday: 'short' }).toUpperCase()
              const dayOfMonth = date.getDate()
              const month = date.toLocaleString(locale, { month: 'long' }).slice(0, 3).toUpperCase()

              return (
                <th
                  key={index}
                  className={`border-r border-gray-400 ${index % 7 >= 5 ? 'bg-blue-200' : ''}`}
                >
                  <div>{day}</div>
                  <div>{dayOfMonth}</div>
                  <div className="uppercase">{month}</div>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr className="border-b border-gray-400 text-center">
            <td className="border-r border-gray-400 p-4 text-left">Cabaña de Piedra</td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer">
              CR
              <br /> $19,900
            </td>
            <td className="border-r border-gray-400 p-4 bg-yellow-100 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
          </tr>
          <tr className="border-b border-gray-400 bg-gray-200 text-center">
            <td className="border-r border-gray-400 p-4 text-left hover:bg-gray-300 cursor-pointer">
              Cabaña Victoria
            </td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer">
              CR
              <br /> $19,900
            </td>
            <td className="border-r border-gray-400 p-4 bg-yellow-100 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
          </tr>
          <tr className="border-b border-gray-400 text-center">
            <td className="border-r border-gray-400 p-4 text-left hover:bg-gray-300 cursor-pointer">
              Cabaña Vista del Río
            </td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer">
              CR
              <br /> $19,900
            </td>
            <td className="border-r border-gray-400 p-4 bg-yellow-100 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
            <td className="border-r border-gray-400 p-4 w-20 bg-blue-200 hover:bg-gray-300 cursor-pointer"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InlineCalendar
