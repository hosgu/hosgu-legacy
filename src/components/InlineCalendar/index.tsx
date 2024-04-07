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

      <ul className="flex w-full list-none mt-0 pt-0 justify-between text-center text-xs bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 overflow-x-auto">
        <li className="border-r border-gray-400 h-14 w-full leading-[56px] pr-20">Expand</li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          MON <br />
          17 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          TODAY <br />
          18 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          WED <br />
          19 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          THU <br />
          20 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          FRI <br />
          21 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1 bg-blue-200">
          SAT <br />
          22 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1 bg-blue-200">
          SUN <br />
          23 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          MON <br />
          24 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          TUE <br />
          25 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          WED <br />
          26 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          THU <br />
          27 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1">
          FRI <br />
          28 <br />
          JUL
        </li>
        <li className="border-r border-gray-400 h-14 w-full pt-1 bg-blue-200">
          SAT <br />
          29 <br />
          JUL
        </li>
        <li className="border-gray-400 h-14 w-full pt-1 bg-blue-200">
          SUN <br />
          30 <br />
          JUL
        </li>
      </ul>

      <ul className="flex w-full list-none mt-0 pt-0 justify-between text-center text-xs bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 overflow-x-auto">
        <li className="border-l border-r border-gray-400 h-10 w-full pt-1 pr-20">
          Cabaña de Piedra
        </li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
      </ul>

      <ul className="flex border-t w-full list-none mt-0 pt-0 justify-between text-center text-xs bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 overflow-x-auto bg-gray-200">
        <li className="border-l border-r border-gray-400 h-10 w-full pt-1 pr-20">
          Cabaña Victoria
        </li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
      </ul>

      <ul className="flex border-t border-b w-full list-none mt-0 pt-0 justify-between text-center text-[11px] bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 overflow-x-auto">
        <li className="border-l border-r border-gray-400 h-10 w-full pr-20">
          Cabaña Vista del Río
        </li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
        <li className="border-r border-gray-400 h-10 w-full pt-1"></li>
      </ul>
    </div>
  )
}

export default InlineCalendar
