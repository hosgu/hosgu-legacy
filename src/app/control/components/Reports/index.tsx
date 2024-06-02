'use client'
import React, { FC, useState } from 'react'
import SVG from '@architecturex/components.svg'
import { RenderIf } from '@architecturex/components.renderif'

const Reports: FC = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl mb-4 text-black dark:text-white" id="user-greeting">
        Hi, Carlos.
      </h1>
      <p className="mb-6 text-black dark:text-white" id="dashboard-details">
        Here are the details about your Dashboard
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold">30</div>
          <div className="text-sm">Number of Reservations</div>
          <div className="text-xs mt-1">
            +12% <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold">24</div>
          <div className="text-sm">Number of Guests</div>
          <div className="text-xs mt-1">
            +8% <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold">24</div>
          <div className="text-sm">Number of Cabins</div>
          <div className="text-xs mt-1">
            +8% <i className="fas fa-arrow-up"></i>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <div className="text-gray-600 dark:text-gray-300">No. of Reservations</div>
          <div className="text-2xl font-bold">132</div>
        </div>
        <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <div className="text-gray-600 dark:text-gray-300">No. of Reservations</div>
          <div className="text-2xl font-bold">132</div>
        </div>
        <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <div className="text-gray-600 dark:text-gray-300">No. of Reservations</div>
          <div className="text-2xl font-bold">132</div>
        </div>
      </div>
    </div>
  )
}

export default Reports
