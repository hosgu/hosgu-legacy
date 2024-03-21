import { FC, ReactNode, useState, useEffect } from 'react'
import Table from '~/components/Table'
import Modal from '~/components/Modal'
import Button from '~/components/Button'

type Props = {
  label: string
  createModalTitle: string
  editModalTitle: string
  headers: string[]
  data: { checksum: string; data: any[] }
  refetch: any
  renderRow: (item: any) => ReactNode[]
  CreateFormComponent: ReactNode
  EditFormComponent: ReactNode
  isEditModalOpen: boolean
  onCloseModal: any
}

const ResultsTable: FC<Props> = ({
  label,
  createModalTitle,
  editModalTitle,
  headers,
  data: { checksum, data },
  refetch,
  renderRow,
  CreateFormComponent,
  EditFormComponent,
  isEditModalOpen,
  onCloseModal
}) => {
  const [key, setKey] = useState<string>()
  const [rows, setRows] = useState<ReactNode[][]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    setRows(data.map(renderRow))
    setKey(checksum)
  }, [data, renderRow, checksum])

  return (
    <>
      <Modal
        isModalOpen={isCreateModalOpen}
        onClose={async () => {
          onCloseModal()
          setIsCreateModalOpen(false)

          const { checksum, items: newData } = await refetch()

          setRows(newData.map(renderRow))
          setKey(checksum)
        }}
        title={createModalTitle}
      >
        {CreateFormComponent}
      </Modal>

      <Modal
        isModalOpen={isEditModalOpen}
        onClose={async () => {
          onCloseModal()

          const { checksum, items: newData } = await refetch()

          setRows(newData.map(renderRow))
          setKey(checksum)
        }}
        title={editModalTitle}
      >
        {EditFormComponent}
      </Modal>

      <Table
        key={key}
        label={label}
        createButton={
          <Button color="info" size="small" onClick={() => setIsCreateModalOpen(true)}>
            + Create
          </Button>
        }
        headers={headers}
        rows={rows}
        hoverHighlight
        rowsPerPage={10}
      />
    </>
  )
}

export default ResultsTable
