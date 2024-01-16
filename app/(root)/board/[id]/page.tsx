import React            from 'react'
import { getBoardById } from "@/lib/actions/board.action"
import { getIssues,
  updateIssue
 }                      from "@/lib/actions/issue.action"
import { IBoard }       from "@/database/board.model"
import BoardMain        from "@/components/boards/BoardMain"
import NoResult         from "@/components/shared/NoResult"
import CreateModal      from "@/components/shared/CreateModal"
import LocalSearch      from "@/components/search/LocalSearch"

const Page = async ({
  params, searchParams
}) => {
  const { id } = params
  const { q } = searchParams ?? { q: "" }
  const board: IBoard = await getBoardById({id, q})

  const { title, _id } = board
  // const { issues } = await getIssues(_id)

  const showModal = searchParams.modal
  const showCreateIssueModal = searchParams.issueModal
  const boardId = JSON.stringify(_id)
  const serializedIssues = JSON.parse(JSON.stringify(board.issues))

  return (
    <>
      {showModal && <CreateModal boardId={boardId} />}
      <h1 className="text-lg font-bold capitalize mx-3 mb-4">{title}</h1>
      <LocalSearch 
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search issues by id or name"
        issues={serializedIssues}
      />
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
