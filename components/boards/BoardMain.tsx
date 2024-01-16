"use client"

import React, { useEffect, useState, useCallback } from 'react'
import BoardColumn from "@/components/boards/BoardColumn"
import { useBoard } from "@/context/BoardProvider"
import { IIssue } from '@/database/issue.model'
import { DragDropContext, DropResult, 
  DragStart, DragUpdate, DroppableId
} from 'react-beautiful-dnd'
import {
  createSortablePayloadByIndex, 
  getBetweenRankAsc, 
  sortByLexoRankAsc
} from "@/lib/utils"

interface BoardMainProps {
  boardId: string;
  updateIssue: (params: IIssue) => Promise<void>
  issues: IIssue[]
}

const BoardMainProps = ({
  boardId,
  issues,
  updateIssue
}: BoardMainProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { state, dispatch } = useBoard()

  useEffect(() => {
    const sorted = issues.sort(sortByLexoRankAsc)
    dispatch({
      type: 'SET_ISSUES', 
      payload: { issues: sorted } 
    })
  }, [boardId, issues])

  const onDragStartHandler = (event: DragStart) => {
    console.log('onDragStart')
    const { draggableId } = event
    setActiveId(draggableId)
  }

  const onDragUpdateHandler = (event: DragUpdate) => {
    // console.log('onDragUpdate', event)
  }

  const onDragEndHandler = async (result: DropResult) => {
    const { draggableId, source, destination } = result
    // 1. find prev, current, next items
    const oldColItems = state.issues.filter(issue => issue.status === destination?.droppableId)
    const sortablePayload = createSortablePayloadByIndex(state.issues, result)

    // 2. calculate new rank
    const newRank = getBetweenRankAsc(sortablePayload)
    const newItems = [...state.issues]
    const currIndex = state.issues.findIndex(x => x._id === sortablePayload.entity._id)

    // 3. replace current rank and state
    newItems[currIndex] = {
      ...newItems[currIndex], 
      rank: newRank.toString(), 
      status: destination?.droppableId
    } as IIssue

    // 4. set state & save item
    dispatch({
      type: 'SET_ISSUES', 
      payload: { issues: newItems }
    })

    try {
      await updateIssue(newItems[currIndex])
    } catch (error) {
      console.log(error)
    }

    setActiveId(null)
  }

  return (
    <DragDropContext 
      onDragStart={onDragStartHandler}
      onDragUpdate={onDragUpdateHandler}
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