'use client'
import { FC, useState } from 'react'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'

import CreateGuestForm from '~/app/dashboard/components/Guests/Form'
import ResultsTable from '../components/ResultsTable'

type Props = {
  data: any
  refetch: any
  connectedUser: any
  deleteServerAction?: any
}

const viewLink = (id: string) => `/dashboard/users/profile/${id}`
const editLink = (id: string) => `/dashboard/users/edit/${id}`

const Results: FC<Props> = ({ data: rawData = [], refetch, deleteServerAction, connectedUser }) => {
  // Initial states
  const [data, setData] = useState(rawData)

  // Methods
  const handleDelete = async (id: string) => {
    const formData = core.formData.set(new FormData(), {
      id
    })
    const response = await deleteServerAction(formData)
    if (response.ok) {
      const filteredData = data.filter((item: any) => item.id !== id)
      setData(filteredData)
    }
  }

  const renderRow = (item: any) => [
    <a key={`name-${item.id}`} href={viewLink(item.id)}>
      {item.fullName}
    </a>,
    item.tier,
    item.role,
    item.email,
    item.phone,
    item.website,
    item.birthday,
    <>
      <a key={`edit-${item.id}`} href={editLink(item.id)}>
        Edit
      </a>{' '}
      <RenderIf isTrue={connectedUser.email !== item.email}>
        <a key={`delete-${item.id}`} href="#" onClick={() => handleDelete(item.id)}>
          Delete
        </a>
      </RenderIf>
    </>
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <ResultsTable
        label="Users"
        createModalTitle="Add New User"
        headers={['Full Name', 'Tier', 'Role', 'Email', 'Phone', 'Website', 'Birthday', 'Actions']}
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

export default Results
