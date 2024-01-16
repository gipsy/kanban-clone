import React from 'react'

import CreateModal            from "@/components/shared/CreateModal"
import Link                   from "next/link"
import Image                  from "next/image"
import NoResult               from "@/components/shared/NoResult"
import BoardItem              from "@/components/boards/BoardItem"
import { Button }             from "@/components/ui/button"
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
        <h1 className="flex-1 h1-bold text-dark100_light900">Your boards</h1>
        {boards !== undefined && boards.length > 0 &&
          <Link
            href={`?modal=true`}
          >
            <Button className="paragraph-medium mt-5 min-h-[46px]
              rounded-lg bg-primary-500 px-4 py-3 text-light-900
              hover:bg-primary-500 dark:bg-primary-500
              dark:text-light-900 m-auto
            ">
              <Image
                src="/assets/icons/plus-white.svg"
                alt="add new board"
                width={10} height={10}
                className="mr-2"
              />Add new board
            </Button>
          </Link>
        }
      </div>
      
      <div className="mt-10 flex w-full flex-col gap-6">
        {boards !== undefined && boards.length > 0
          ? boards.map(board => (
            <BoardItem
              key={board._id}
              _id={JSON.parse(JSON.stringify(board._id))}
              title={JSON.parse(JSON.stringify(board.title))}
              issuesCount={JSON.parse(JSON.stringify(board.issues.length))}
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
