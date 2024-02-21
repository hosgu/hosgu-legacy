import { useRef, useState } from 'react'

function TableSearch({ rows, searchRows, setFoundRows, setCurrentPage }: TableSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null!)
  const [isInputVisible, setIsInputVisible] = useState(false)

  return (
    <div className="flex gap-2">
      <div
        onClick={toggleInputVisibility}
        className="hover:cursor-pointer hover:bg-slate-200 hover:rounded-md p-1 flex justify-center items-center select-none"
      >
        🔍
      </div>
      <input
        ref={inputRef}
        onChange={(e) => handleSearch(e, rows)}
        type="search"
        placeholder="Type to search..."
        className={`transition-{width} ease-in-out duration-300 bg-gray-50 text-sm placeholder-gray-400 rounded outline-gray-200
          ${isInputVisible ? 'w-36 px-2 py-1.5 outline' : 'w-0'}`}
      />
    </div>
  )

  function toggleInputVisibility() {
    isInputVisible ? inputRef.current?.blur() : inputRef.current?.focus()
    setIsInputVisible((prevIsOpen) => !prevIsOpen)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>, rows: TableSearchProps['rows']) {
    const query = formatQuery(e.target.value)
    let foundRows: string[][] | [] = []

    if (isValidQuery(query)) {
      if (searchRows) {
        const foundRowsIndex: Set<number> = new Set()

        searchRows.forEach((row, index) => {
          const isMatch = byQuery(row, query)
          if (isMatch) foundRowsIndex.add(index)
        })

        foundRows = rows.filter((_, index) => foundRowsIndex.has(index))
      } else foundRows = rows.filter((row) => byQuery(row, query))

      setFoundRows(foundRows)
      setCurrentPage(1)
    } else setFoundRows(rows)
  }

  function isValidQuery(query: string): boolean {
    return query.length > 0
  }

  function formatQuery(query: string): string {
    const extraWhitespace = /\s{2,}/g
    const specialCharacters = /[+*?^$.[/\]{}()|/]/g
    return query.trim().replace(extraWhitespace, ' ').replace(specialCharacters, escapeCharacters)

    function escapeCharacters(match: string) {
      return `\\${match}`
    }
  }

  function byQuery(row: string[], query: string): boolean {
    const regex = new RegExp(`^${query}`, 'i')
    return row.some((rowValue) => regex.test(rowValue))
  }
}

interface TableSearchProps {
  rows: string[][]
  searchRows?: string[][]
  setFoundRows: React.Dispatch<React.SetStateAction<string[][] | []>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default TableSearch
