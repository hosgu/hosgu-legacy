import { FC, ReactNode, useState, useEffect } from 'react'
import Table from '~/components/Table'
import Modal from '~/components/Modal'
import Button from '~/components/Button'

type Props = {
  label: string
  createModalTitle: string
  editModalTitle: string
  headers: string[]
  data: any[]
  refetch: any
  renderRow: (item: any) => ReactNode[]
  CreateFormComponent: ReactNode
  EditFormComponent: ReactNode
  isEditModalOpen: boolean
  setIsEditModalOpen: any
}

const ResultsTable: FC<Props> = ({
  label,
  createModalTitle,
  editModalTitle,
  headers,
  data,
  refetch,
  renderRow,
  CreateFormComponent,
  EditFormComponent,
  isEditModalOpen,
  setIsEditModalOpen
}) => {
  const [rows, setRows] = useState<ReactNode[][]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [action, setAction] = useState('save')

  useEffect(() => {
    setRows(data.map(renderRow))
  }, [data, renderRow])

  return (
    <>
      <Modal
        isModalOpen={isCreateModalOpen}
        onClose={async () => {
          setIsCreateModalOpen(false)

          const {
            data: { items: newData }
          } = await refetch()

          setRows(newData.map(renderRow))
        }}
        title={createModalTitle}
      >
        {CreateFormComponent}
      </Modal>

      <Modal
        isModalOpen={isEditModalOpen}
        onClose={async () => {
          setIsEditModalOpen(false)

          const {
            data: { items: newData }
          } = await refetch()
          setRows(newData.map(renderRow))
          setAction('edit')
        }}
        title={editModalTitle}
      >
        {EditFormComponent}
      </Modal>

      <Table
        key={`table-${rows.length}-${action}`}
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
