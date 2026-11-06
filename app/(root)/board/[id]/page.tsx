import React, { Suspense } from "react"
import { getBoardById } from "@/lib/actions/board.action"
import { updateIssue }  from "@/lib/actions/issue.action"
import { IBoard }       from "@/database/board.model"
import BoardMain        from "@/components/boards/BoardMain"
import NoResult         from "@/components/shared/NoResult"
import CreateModal      from "@/components/shared/CreateModal"
import LocalSearch      from "@/components/search/LocalSearch"

interface BoardViewPageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params, searchParams }: BoardViewPageProps) => {
  const { id } = await params
  const resolvedSearch = (await searchParams) ?? {}
  const q = typeof resolvedSearch.q === 'string' ? resolvedSearch.q : ''
  const board: IBoard = await getBoardById({id, q})

  const { title, _id } = board

  const showModal = resolvedSearch.modal
  const boardId = JSON.stringify(_id)
  const serializedIssues = JSON.parse(JSON.stringify(board.issues))

  return (
    <>
      {showModal && (
        <Suspense fallback={null}>
          <CreateModal boardId={boardId} />
        </Suspense>
      )}
      <h1 className="mx-3 mb-4 text-lg font-bold capitalize text-dark-200 dark:text-light-900">
        {title}
      </h1>
      <Suspense fallback={null}>
        <LocalSearch
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search issues by title name"
        />
      </Suspense>
      {board.issues.length > 0 
        ? (
          <BoardMain 
            updateIssue={updateIssue} 
            issues={serializedIssues} 
            boardId={boardId} 
          />
        ) : <NoResult
          title="There is no issues to show"
          description="Be the first to break the silence!"
          link={`/board/${_id}?modal=true`}
          linkTitle="Create an issue"
        />
      }
    </>
  )
}

export default Page
