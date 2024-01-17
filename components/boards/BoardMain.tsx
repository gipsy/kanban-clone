"use client"

import React, { useEffect }            from 'react'
import BoardColumn                     from "@/components/boards/BoardColumn"
import { useBoard }                    from "@/context/BoardProvider"
import { IIssue }                      from "@/database/issue.model"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import {
  createSortablePayloadByIndex, 
  getBetweenRankAsc, 
  sortByLexoRankAsc }                  from "@/lib/utils"
import { 
  UpdateIssueParams, 
  UpdateIssueResponse 
}         from '@/lib/actions/shared.types'
import { TEntity } from '@/types'

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

  useEffect(() => {
    const sorted = issues.sort(sortByLexoRankAsc)
    dispatch({
      type: 'SET_ISSUES', 
      payload: { issues: sorted } 
    })
  }, [boardId, issues])

  const onDragEndHandler = async (result: DropResult) => {
    const { destination } = result
    // 1. find prev, current, next items
    // const entityIssues = state.issues as unknown as TEntity[]
    // const entityIssues = state.issues as unknown as IIssue[]
    const sortablePayload = createSortablePayloadByIndex(state.issues, result)

    // 2. calculate new rank
    const newRank = getBetweenRankAsc(sortablePayload)
    const newItems = [...state.issues]
    const currIndex = state.issues.findIndex(x => x._id === sortablePayload.entity?._id)

    // 3. replace current rank and state
    newItems[currIndex] = {
      ...newItems[currIndex],
      rank: newRank.toString(),
      status: destination?.droppableId
    } as TEntity

    // 4. set state & save item
    dispatch({
      type: 'SET_ISSUES', 
      payload: { issues: newItems }
    })

    console.log('NEW ITEMS', newItems[currIndex])

    try {
      await updateIssue(newItems[currIndex])
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