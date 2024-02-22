import { FC, ReactNode, useState, useEffect } from 'react'
import Table from '~/components/Table'
import Modal from '~/components/Modal'
import Button from '~/components/Button'

type Props = {
  label: string
  modalTitle: string
  headers: string[]
  data: any[]
  refetch: any
  renderRow: (item: any) => ReactNode[]
  FormComponent: ReactNode
}

const ResultsTable: FC<Props> = ({
  label,
  modalTitle,
  headers,
  data,
  refetch,
  renderRow,
  FormComponent
}) => {
  const [rows, setRows] = useState<ReactNode[][]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setRows(data.map(renderRow))
  }, [data, renderRow])

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={async () => {
          setIsModalOpen(false)

          const {
            data: { items: newData }
          } = await refetch()

          setRows(newData.map(renderRow))
        }}
        title={modalTitle}
      >
        {FormComponent}
      </Modal>

      <Table
        key={`table-${rows.length}`}
        label={label}
        createButton={
          <Button color="info" size="small" onClick={() => setIsModalOpen(true)}>
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
