import { ChangeEvent, useContext, useState } from 'react'
import { BlogContext } from '../contexts/BlogContext'

interface SearchBarProps {
  setString: (searchField: string) => void
}

export function SearchBar({ setString }: SearchBarProps) {
  const { issuesList } = useContext(BlogContext)
  const [findField, setFindField] = useState('')
  function handleFind(e: ChangeEvent<HTMLInputElement>) {
    setFindField(e.target.value)
    setString(e.target.value)
  }
  return (
    <>
      <div className="mt-16 flex w-full flex-col px-72">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-titleSmall text-base-subtitle">
            Publicações
          </span>
          <span className="text-textSmall text-base-border">
            {issuesList?.length !== 0
              ? `${issuesList?.length} publicações`
              : ''}
          </span>
        </div>
        <input
          onChange={(e) => handleFind(e)}
          type="text"
          value={findField}
          placeholder="Buscar conteúdo"
          className="rounded-md border-2 border-base-border bg-base-input px-4 py-3 text-base-text outline-none placeholder:text-base-border"
        />
      </div>
    </>
  )
}
