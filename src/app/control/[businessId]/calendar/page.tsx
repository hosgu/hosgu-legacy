import { NextPage } from 'next'

import InlineCalendar from '~/components/InlineCalendar'

const CalendarPage: NextPage = async () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <InlineCalendar />
    </div>
  )
}

export default CalendarPage
