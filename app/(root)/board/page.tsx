import React from 'react'

import CreateModal            from "@/components/shared/CreateModal"
import HomeFilters            from "@/components/home/HomeFilters"
import NoResult               from "@/components/shared/NoResult"
import BoardItem              from "@/components/boards/BoardItem"
import { 
  getIssues, 
}                             from "@/lib/actions/issue.action"
import {
  getBoards,
  getBoardById
}                             from "@/lib/actions/board.action"
import { GetIssuesParams }    from "@/lib/actions/shared.types"

const Page = async ({params, searchParams}) => {
  // const { issues } = await getIssues( params )
  const boards = await getBoards()
  // const board = await getBoardById()
  // const defaultBoardId = allBoardsData[0]?.id
  const showModal = searchParams.modal

  return (
    <>
      {showModal && <CreateModal board />}
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Your boards</h1>
      </div>
      
      <div className="mt-10 flex w-full flex-col gap-6">
        {boards !== undefined && boards.length > 0
          ? boards.map(board => (
            <BoardItem
              key={board._id}
              _id={board._id}
              title={board.title}
              createdAt={board.createdAt}
            />
          )) : <NoResult
            title="There is no board to show"
            description="Be the first to break the silence!"
            link="/board?modal=true"
            linkTitle="Create the board"
          />
        }
      </div>
    </>
  )
}

export default Page
