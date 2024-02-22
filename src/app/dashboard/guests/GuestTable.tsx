'use client'
import { FC, useState } from 'react'
import core from '@architecturex/utils.core'

import { deleteGuestServerAction } from '~/app/shared/actions/dashboard/guest'
import CreateGuestForm from '~/app/dashboard/components/Guests/Form'
import ResultsTable from '../components/ResultsTable'

type Props = {
  data: any
  refetch: any
  connectedUser: any
}

const GuestTable: FC<Props> = ({ data: rawData = [], refetch, connectedUser }) => {
  // Initial states
  const [data, setData] = useState(rawData)

  // Methods
  const handleDelete = async (id: string) => {
    const formData = core.formData.set(new FormData(), {
      id
    })

    const response = await deleteGuestServerAction(formData)

    if (response.ok) {
      const filteredData = data.filter((guest: any) => guest.id !== id)

      setData(filteredData)
    }
  }

  const renderRow = (item: any) => [
    <a key={`name-${item.id}`} href={`/dashboard/guests/profile/${item.id}`}>
      {item.fullName}
    </a>,
    item.email,
    item.phone,
    item.website,
    item.gender,
    item.birthday,
    <>
      <a key={`edit-${item.id}`} href={`/dashboard/guests/edit/${item.id}`}>
        Edit
      </a>
      <a key={`delete-${item.id}`} href="#" onClick={() => handleDelete(item.id)}>
        Delete
      </a>
    </>
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <ResultsTable
        label="Guests"
        modalTitle="Add New Guest"
        headers={['Full Name', 'Email', 'Phone', 'Website', 'Gender', 'Birthday', 'Actions']}
        data={data}
        refetch={refetch}
        renderRow={renderRow}
        FormComponent={
          <CreateGuestForm action="save" data={{ businessId: connectedUser.businessId }} />
        }
      />
    </div>
  )
}

export default GuestTable
