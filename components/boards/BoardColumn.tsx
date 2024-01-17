"use client"

import React, { Suspense }   from 'react'
import IssueCard             from "@/components/cards/IssueCard"
import IssueAdd              from "@/components/cards/IssueAdd"
import { useBoard }          from "@/context/BoardProvider"
import { Droppable }         from "react-beautiful-dnd"
import { sortByLexoRankAsc } from "@/lib/utils"

interface BoardColumnProps {
  status: string
}

const BoardColumn = ({
  status
}: BoardColumnProps) => {
  const { state } = useBoard()

  const filteredIssues = () => {
    switch (status) {
      case 'to-do':
        return state.issues.filter(issue => 
          issue.status === 'to-do').sort(sortByLexoRankAsc)
        break;
      case 'in-progress':
        return state.issues.filter(issue => issue.status === 'in-progress').sort(sortByLexoRankAsc)
        break;
      case 'done':
        return state.issues.filter(issue => issue.status === 'done').sort(sortByLexoRankAsc)
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
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-4"
            >
              <Suspense fallback={<div>...Loading</div>}>
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
              </Suspense>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default BoardColumn