import React            from 'react'
import { getBoardById } from "@/lib/actions/board.action"
import { getIssues }    from "@/lib/actions/issue.action"
import { IBoard }       from "@/database/board.model"
import BoardMain        from "@/components/boards/BoardMain"
import NoResult         from "@/components/shared/NoResult"
import CreateModal      from "@/components/shared/CreateModal"

const Page = async ({
  params, searchParams
}) => {
  const board: IBoard = await getBoardById(params)

  const { title, _id } = board
  const { issues } = await getIssues(_id)

  const showModal = searchParams.modal
  const showCreateIssueModal = searchParams.issueModal

  return (
    <>
      {showModal && <CreateModal boardId={JSON.stringify(_id)} />}
      <h1 className="text-lg font-bold capitalize mx-3 mb-4">{title}</h1>
      {issues.length > 0 
        ? (
          <BoardMain getIssues={getIssues} boardId={JSON.stringify(_id)} />
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
