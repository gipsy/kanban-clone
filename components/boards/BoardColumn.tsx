"use client"

import React, { useState } from 'react'
import IssueCard from "@/components/cards/IssueCard"
import IssueAdd from "@/components/cards/IssueAdd"
import { useBoard } from "@/context/BoardProvider"
import { Droppable } from "react-beautiful-dnd"
import { sortByLexoRankAsc } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface BoardColumnProps {
  status: string
}

import styled from 'styled-components'
const IssueList = styled.div`
  // padding: 8px;
  transition: background-color 0.2s ease;
  // background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BoardColumn = ({
  status
}: BoardColumnProps) => {
  const { state, dispatch } = useBoard()
  // console.log('dispatch', dispatch)
  // console.log('state', state)

  const filteredIssues = () => {
    switch (status) {
      case 'to-do':
        return state.issues.filter(issue => issue.status === 'to-do').sort(sortByLexoRankAsc)
        break;
      case 'in-progress':
        return state.issues.filter(issue => issue.status === 'in-progress').sort(sortByLexoRankAsc)
        break;
      case 'done':
        return state.issues.filter(issue => issue.status === 'done')
        break;
      default:
        return []
    }
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
      <div className="px-4 py-2">
        <div className="flex justify-items-center mt-1 mb-3">
          {status === 'to-do' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">To Do</h3>}
          {status === 'in-progress' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">In Progress</h3>}
          {status === 'done' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">Done</h3>}
        </div>

        <Droppable 
          droppableId={status} 
          // renderClone={(provided, snapshot, rubric) => (
          //   <div
          //     {...provided.draggableProps}
          //     {...provided.dragHandleProps}
          //     ref={provided.innerRef}
          //   >
          //     Item id: {filteredIssues()[rubric.source.index].id}
          //   </div>
          // )}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              className="flex flex-col gap-4"
            >
              {filteredIssues().length > 0 && filteredIssues().map((issue, index) => (
                <IssueCard
                  key={issue._id}
                  _id={issue._id}
                  title={issue.title}
                  description={issue.description}
                  createdAt={issue.createdAt}
                  index={index}
                  rank={issue.rank}
                />
              ))}
              {provided.placeholder}
              <IssueAdd status={status} />
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default BoardColumn