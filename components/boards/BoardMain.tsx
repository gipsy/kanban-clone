"use client"

import React, { useEffect }            from 'react'
import BoardColumn                     from "@/components/boards/BoardColumn"
import { ActionKind, useBoard }                    from "@/context/BoardProvider"
import { IIssue }                      from "@/database/issue.model"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import {
  createSortablePayloadByIndex, 
  getBetweenRankAsc, 
  sortByLexoRankAsc }                  from "@/lib/utils"
import { 
  UpdateIssueParams, 
  UpdateIssueResponse 
}                                     from "@/lib/actions/shared.types"
import { TEntity }                    from "@/types"
import { usePathname }                from "next/navigation"

interface BoardMainProps {
  boardId: string;
  updateIssue: (params: UpdateIssueParams) => Promise<UpdateIssueResponse>
  issues: IIssue[]
}

const BoardMainProps = ({
  boardId,
  issues,
  updateIssue
}: BoardMainProps) => {
  const { state, dispatch } = useBoard()
  const pathname = usePathname()

  useEffect(() => {
    const sorted = issues.sort(sortByLexoRankAsc)
    dispatch({
      type: ActionKind.setIssuesAction,
      payload: { issues: sorted } 
    })
  }, [boardId, issues])

  const onDragEndHandler = async (result: DropResult) => {
    const { destination } = result
    // 1. find prev, current, next items
    const sortablePayload = createSortablePayloadByIndex(state.issues, result)

    // 2. calculate new rank
    const newRank = getBetweenRankAsc(sortablePayload)
    const newItems = [...state.issues]
    const currIndex = state.issues.findIndex(x => x._id === sortablePayload.entity?._id)

    // 3. replace current rank and state
    newItems[currIndex] = {
      ...newItems[currIndex],
      rank: newRank.toString(),
      status: destination?.droppableId,
    } as TEntity

    // 4. set state & save item
    dispatch({
      type: ActionKind.setIssuesAction,
      payload: { issues: newItems }
    })

    const payload = {
      ...newItems[currIndex],
      path: pathname
    }

    try {
      await updateIssue(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DragDropContext 
      onDragEnd={onDragEndHandler}
    >
      <div className="flex mb-4 h-screen">
        <div className="w-1/3 mx-3 h-12">
          <BoardColumn status="to-do" />
        </div>
        <div className="w-1/3 mx-3 h-12">
          <BoardColumn status="in-progress" />
        </div>
        <div className="w-1/3 mx-3 h-12">
          <BoardColumn status="done" />
        </div>
      </div>
    </DragDropContext>
  )
}

export default BoardMainProps