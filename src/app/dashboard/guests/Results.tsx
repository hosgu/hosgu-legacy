'use client'
import { FC, useState } from 'react'
import core from '@architecturex/utils.core'
import files from '@architecturex/utils.files'

import GuestForm from '~/app/dashboard/components/Guests/Form'
import ResultsTable from '../components/ResultsTable'
import { deleteFilesFromServer } from '~/app/shared/filesUtils'
import { deleteFile } from '~/app/shared/filesUtils'

type Props = {
  data: any
  refetch: any
  connectedUser: any
  deleteServerAction: any
}

const viewLink = (id: string) => `/dashboard/guests/profile/${id}`

const Results: FC<Props> = ({
  data: { checksum, data: rawData = [] },
  refetch,
  deleteServerAction,
  connectedUser
}) => {
  // Initial states
  const [data, setData] = useState(rawData)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [itemToEdit, setItemToEdit] = useState({})
  const [fileStatus, setFileStatus] = useState<any>([])

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

  const handleEdit = (item: any) => {
    setIsEditModalOpen(true)
    setItemToEdit(item)
    setFileStatus(item.photo ? [{ url: item.photo, action: 'show' }] : [])
  }

  const onCloseModal = async () => {
    await files.deleteFilesFromServer(fileStatus, files.deleteFile)
    setFileStatus([])
    setIsEditModalOpen(false)
  }

  const renderRow = (item: any) => [
    <a key={`name-${item.id}`} href={viewLink(item.id)}>
      {item.fullName}
    </a>,
    item.email,
    item.phone,
    item.website,
    item.gender,
    item.birthday,
    <>
      <a key={`edit-${item.id}`} onClick={() => handleEdit(item)}>
        Edit
      </a>{' '}
      <a key={`delete-${item.id}`} href="#" onClick={() => handleDelete(item.id)}>
        Delete
      </a>
    </>
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <ResultsTable
        label="Guests"
        createModalTitle="Add New Guest"
        editModalTitle="Edit Guest"
        headers={['Full Name', 'Email', 'Phone', 'Website', 'Gender', 'Birthday', 'Actions']}
        data={{ checksum, data }}
        refetch={refetch}
        renderRow={renderRow}
        CreateFormComponent={
          <GuestForm
            action="save"
            data={{ businessId: connectedUser.businessId }}
            fileStatus={fileStatus}
            setFileStatus={setFileStatus}
          />
        }
        EditFormComponent={
          <GuestForm
            action="edit"
            data={{ businessId: connectedUser.businessId, ...itemToEdit }}
            fileStatus={fileStatus}
            setFileStatus={setFileStatus}
          />
        }
        isEditModalOpen={isEditModalOpen}
        onCloseModal={onCloseModal}
      />
    </div>
  )
}

export default Results
