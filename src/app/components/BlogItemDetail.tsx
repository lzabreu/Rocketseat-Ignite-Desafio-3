'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarBlank, CaretLeft, ChatCircle } from 'phosphor-react'
import GithubLink from 'src/assets/GithubLink.svg'
import Image from 'next/image'
import IconGithub from 'src/assets/github'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogContext, Issue } from '../contexts/BlogContext'
import { useContext } from 'react'

interface BlogItemDetailProps {
  issue: Issue
}
export function BlogItemDetail({ issue }: BlogItemDetailProps) {
  const { comments } = useContext(BlogContext)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-full w-full  bg-[rgba(0,0,0,0.65)]">
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[800px] w-8/12 -translate-x-1/2 -translate-y-1/2 rounded-md bg-base-profile p-8 align-top">
          <div className="flex w-full items-center justify-between ">
            <Dialog.Close className="flex items-center justify-center  leading-none text-brand-blue">
              <CaretLeft size={24} />
              VOLTAR
            </Dialog.Close>
            {comments && comments.length > 0 && (
              <a target="_blank" href={issue.html_url} rel="noreferrer">
                <Image src={GithubLink} alt="Link para o github" />
              </a>
            )}
          </div>
          <div className=" items-start text-base-span">
            <div className="mt-5 flex w-[70%] text-ellipsis p-2 text-left text-titleMedium text-base-title">
              {issue.title}
            </div>
            <div className="justify-space-between flex items-center gap-6">
              <div className="flex items-center justify-center gap-2 text-textMedium">
                <IconGithub />
                {issue.user.login}
              </div>
              <div className="flex items-center justify-center gap-2 text-textMedium">
                <CalendarBlank />
                {formatDistanceToNow(new Date(issue.created_at), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </div>
              <div className="flex items-center justify-center gap-2 text-textMedium">
                <ChatCircle weight="fill" />
                {comments?.length} Comentários
              </div>
            </div>
            <div className="scroll-y mt-4 max-h-[600px] overflow-y-auto bg-base-input p-4">
              <ReactMarkdown
                // eslint-disable-next-line react/no-children-prop
                children={issue.body}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
