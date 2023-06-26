'use client'
import Image from 'next/image'
import Avatar from 'src/assets/avatar.png'
import GithubLink from 'src/assets/GithubLink.svg'
import IconBuilding from 'src/assets/building'
import IconGithub from 'src/assets/github'
import IconPeopleFill from 'src/assets/people'
import { ChangeEvent, useContext, useState } from 'react'
import { BlogContext } from '../contexts/BlogContext'

export function Profile() {
  const { user, repos, getUser, setSelectedRepoFunction, getIssues } =
    useContext(BlogContext)
  const [githubUser, setGithubUser] = useState('')
  const [text, setText] = useState('')
  const [repoActive, setRepoActive] = useState(false)
  const handleGetUser = (gitUser: string) => {
    getUser(gitUser)
    setRepoActive(true)
  }

  const handleChangeRepo = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setSelectedRepoFunction(e.target.value)
    getIssues(e.target.value)
  }

  return (
    <div className="z-auto mt-[-88px] w-full px-72">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <input
            className="rounded-md border-2 border-base-border bg-base-input px-4 py-3 text-base-text outline-none placeholder:text-base-label"
            type="text"
            placeholder="Buscar Usuário do GitHub"
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
          />
          <button
            onClick={() => handleGetUser(githubUser)}
            className="rounded-md border-2 border-base-profile bg-base-border px-4 py-3 text-base-text hover:bg-base-input"
          >
            Buscar
          </button>
        </div>
        <input
          className="flex-1 rounded-md border-2 border-base-border bg-base-input px-4 py-3 text-base-text outline-none placeholder:text-base-label "
          type="search"
          list="list"
          autoComplete="on"
          value={text}
          onChange={(e) => handleChangeRepo(e)}
          placeholder={repoActive ? 'Escolha um repositório' : ''}
          disabled={!repoActive}
        />
        <datalist
          id="list"
          className="rounded-md border-2 border-base-border bg-base-input text-base-text"
        >
          {repos.map((repo) => (
            <option key={repo.id} value={repo.name} />
          ))}
        </datalist>
      </div>
      <div className="flex w-full gap-8 rounded-lg bg-base-profile px-10 py-8 text-white ">
        <Image
          src={user?.avatar_url ? user.avatar_url : Avatar}
          width={148}
          height={148}
          alt="avatar"
          className="rounded-lg"
        />
        <div className="flex flex-col justify-end py-2">
          <div className="flex justify-between">
            <p className="mb-2 text-titleLarge font-bold leading-5">
              {user?.name ? user.name : 'Cameron Williamson'}
            </p>
            <a
              target="_blank"
              href={user?.html_url ? user.html_url : '#'}
              rel="noreferrer"
            >
              <Image
                src={GithubLink}
                alt="Link para o github"
                className="mt-[-10px]"
              />
            </a>
          </div>
          <p className="mt-1 text-textMedium tracking-tight text-base-text">
            {user?.bio
              ? user.bio
              : `Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu
            viverra massa quam dignissim aenean malesuada suscipit. Nunc volutpat pulvinar vel mass.`}
          </p>
          <div className="justify-space-between mt-6 flex items-center gap-6">
            <div className="flex items-center justify-center gap-2 text-textMedium text-base-subtitle">
              <IconGithub className="text-base-border" />
              {user?.login ? user.login : 'cameronwll'}
            </div>
            <div className="flex items-center justify-center gap-2 text-textMedium text-base-subtitle">
              <IconBuilding className="text-base-border" />
              {user?.company ? user.company : 'Rocketseat'}
            </div>
            <div className="flex items-center justify-center gap-2 text-textMedium text-base-subtitle">
              <IconPeopleFill className="text-base-border" />
              {user?.followers
                ? `${Intl.NumberFormat().format(user.followers)} seguidores`
                : '0 seguidores'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
