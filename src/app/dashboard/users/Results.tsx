'use client'
import { FC, useState } from 'react'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'

import UserForm from '~/app/dashboard/components/Users/Form'
import ResultsTable from '../components/ResultsTable'

type Props = {
  data: any
  refetch: any
  connectedUser: any
  deleteServerAction?: any
}

const viewLink = (id: string) => `/dashboard/users/profile/${id}`

const Results: FC<Props> = ({ data: rawData = [], refetch, deleteServerAction, connectedUser }) => {
  // Initial states
  const [data, setData] = useState(rawData)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [itemToEdit, setItemToEdit] = useState({})

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

  const handleEdit = async (item: any) => {
    setItemToEdit(item)
    setIsEditModalOpen((prev) => {
      return !prev
    })
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
      <a key={`edit-${item.id}`} onClick={() => handleEdit(item)}>
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
        editModalTitle="Edit User"
        headers={['Full Name', 'Tier', 'Role', 'Email', 'Phone', 'Website', 'Birthday', 'Actions']}
        data={data}
        refetch={refetch}
        renderRow={renderRow}
        CreateFormComponent={
          <UserForm action="save" data={{ businessId: connectedUser.businessId }} />
        }
        EditFormComponent={
          <UserForm action="edit" data={{ businessId: connectedUser.businessId }} />
        }
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  )
}

export default Results
