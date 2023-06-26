'use client'
import Image from 'next/image'
import Cover from '../assets/Cover.svg'
import { Profile } from './components/Profile'
import { SearchBar } from './components/SearchBar'
import { BlogItem } from './components/BlogItem'
import { useContext, useState } from 'react'
import { BlogContext } from './contexts/BlogContext'

export default function Home() {
  const { issuesList } = useContext(BlogContext)
  const [searchString, setSearchString] = useState('')

  function setSearch(search: string) {
    setSearchString(search)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Image src={Cover} alt="cover" />
      <Profile />
      <SearchBar setString={setSearch} />

      <div className="mb-12 mt-12 grid w-full grid-cols-2 gap-8 px-72">
        {issuesList?.length !== 0 &&
          issuesList !== undefined &&
          issuesList
            .filter((item) => item.title.includes(searchString))
            .map((item) => (
              <div key={item.id}>
                <BlogItem issue={item} />
              </div>
            ))}
      </div>
    </main>
  )
}
