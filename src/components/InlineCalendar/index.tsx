'use client'
import React, { FC, useEffect, useState } from 'react'

import cx from '@architecturex/utils.cx'
import dates from '@architecturex/utils.dates'

import SVG from '@architecturex/components.svg'

const date = new Date()

const InlineCalendar: FC = () => {
  return (
    <div className="w-[98%] ml-auto mr-auto">
      <header className="flex justify-center mt-4">
        <SVG.Arrow direction="left" />
        <span>May 2021</span>
        <SVG.Arrow direction="right" />
      </header>

      <table className="border border-gray-400 w-full text-xs">
        <thead className="bg-white border-b border-gray-400 text-[10px] font-normal">
          <tr>
            <th className="border-r border-gray-400 text-xs">Properties</th>
            <th className="border-r border-gray-400">
              MON
              <br />
              17
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400 bg-yellow-100">
              TUE
              <br />
              18
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              WED
              <br />
              19
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              THU
              <br />
              20
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              FRI
              <br />
              21
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400 bg-blue-200">
              SAT
              <br />
              22
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400 bg-blue-200">
              SUN
              <br />
              23
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              MON
              <br />
              24
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              TUE
              <br />
              25
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              WED
              <br />
              26
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              THU
              <br />
              27
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400">
              FRI
              <br />
              28
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400 bg-blue-200">
              SAT
              <br />
              29
              <br />
              JUL
            </th>
            <th className="border-r border-gray-400 bg-blue-200">
              SUN
              <br />
              30
              <br />
              JUL
            </th>
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
