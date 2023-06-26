import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import * as Dialog from '@radix-ui/react-dialog'
import { BlogItemDetail } from './BlogItemDetail'
import { BlogContext, Issue } from '../contexts/BlogContext'
import { useContext } from 'react'

export interface IssueProps {
  issue: Issue
}
export function BlogItem({ issue }: IssueProps) {
  const { getComments } = useContext(BlogContext)

  function getIssueComments(issueNumber: number) {
    getComments(issueNumber)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          className="flex h-[260px] w-full flex-col rounded-xl bg-base-post p-8"
          onClick={() => getIssueComments(issue.number)}
        >
          <div className="align-center flex justify-between">
            <div className="flex w-[70%] text-ellipsis text-left text-titleMedium text-base-title">
              {issue.title
                ? issue.title
                : 'JavaScript data types and data structures'}
            </div>
            <div className="text-textSmall text-base-border">
              {formatDistanceToNow(new Date(issue.created_at), {
                addSuffix: true,
                locale: ptBR,
              })}
            </div>
          </div>
          <p className="mt-5 h-24 overflow-hidden text-ellipsis border-0 bg-transparent text-left text-textMedium font-light text-base-text">
            {issue.body
              ? issue.body
              : `Programming languages all have built-in data structures, but these often
        differ from one language to another. This article attempts to list the
        built-in data structures available in JavaScript and what properties
        they have. These can be used to build other data structures. Wherever
        possible, comparisons with other languages are drawn.`}
          </p>
        </div>
      </Dialog.Trigger>
      <BlogItemDetail issue={issue} />
    </Dialog.Root>
  )
}
