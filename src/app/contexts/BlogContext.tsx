'use client'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface User {
  id: number
  login: string
  name: string
  avatar_url: string
  repos_url: string
  bio: string
  followers: number
  company: string
  html_url: string
}
interface Repos {
  id: number
  name: string
}
export interface Issues {
  total_count: number
  incomplete_results: boolean
  items: [
    {
      id: number
      number: number
      body: string
      title: string
      created_at: string
      timeline_url: string
      html_url: string
      user: {
        id: number
        login: string
        name: string
        avatar_url: string
      }
    },
  ]
}
export interface Issue {
  id: number
  number: number
  body: string
  title: string
  created_at: string
  timeline_url: string
  html_url: string
  user: {
    id: number
    login: string
    name: string
    avatar_url: string
  }
}
export interface Comments {
  id: number
  html_url: string
  actor: {
    id: number
    login: string
    name: string
    avatar_url: string
  }
}

interface BlogContextType {
  user: User | undefined
  repos: Repos[]
  selectedRepo: string
  issues: Issues | undefined
  issuesList: Issue[] | undefined
  comments: Comments[] | undefined
  getUser: (gitUser: string) => void
  getIssues: (repo: string) => void
  setSelectedRepoFunction: (repo: string) => void
  getComments: (commentNumber: number) => void
}

interface BlogProviderProps {
  children: ReactNode
}

export const BlogContext = createContext({} as BlogContextType)

export function BlogProvider({ children }: BlogProviderProps) {
  const [user, setUser] = useState<User>()
  const [repos, setRepos] = useState<Repos[]>([])
  const [issues, setIssues] = useState<Issues>()
  const [issuesList, setIssuesList] = useState<Issue[]>([])
  const [selectedRepo, setSelectedRepo] = useState('')
  const [comments, setComments] = useState<Comments[]>([])

  async function getUser(gitUser: string) {
    setRepos([])
    setIssuesList([])
    setSelectedRepo('')
    const res = await fetch(`https://api.github.com/users/${gitUser}`)
    const resRepos = await fetch(
      `https://api.github.com/users/${gitUser}/repos?per_page=100`,
    )
    if (!res) {
      throw new Error('Failed to fetch data')
    } else {
      const result = res.json()
      setUser(await result)
    }
    if (!resRepos) {
      throw new Error('Failed to fetch data')
    } else {
      const result = resRepos.json()
      setRepos(await result)
    }
  }
  async function getIssues(repo: string) {
    const res = await fetch(
      `https://api.github.com/search/issues?q=repo:${user?.login}/${repo}`,
    )
    if (!res) {
      throw new Error('Failed to fetch data')
    } else {
      const result = res.json()
      setIssues(await result)
    }
  }
  async function getComments(commentNumber: number) {
    const res = await fetch(
      `https://api.github.com/repos/${user?.login}/${selectedRepo}/issues/${commentNumber}/timeline`,
    )
    if (!res) {
      throw new Error('Failed to fetch data')
    } else {
      const result = res.json()
      setComments(await result)
    }
  }
  useEffect(() => {
    if (issues?.items) {
      setIssuesList([])
      issues?.items.map((item) => {
        return setIssuesList((prev) => [...prev, item])
      })
    }
  }, [issues?.items])

  const setSelectedRepoFunction = (repo: string) => {
    setSelectedRepo(repo)
  }

  return (
    <BlogContext.Provider
      value={{
        user,
        repos,
        selectedRepo,
        getIssues,
        issues,
        issuesList,
        setSelectedRepoFunction,
        getUser,
        getComments,
        comments,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
