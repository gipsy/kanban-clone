import { ComponentType, Suspense }      from "react"
import { useBoard }          from "@/context/BoardProvider"
import { sortByLexoRankAsc } from "@/lib/utils"
import { Droppable }         from "react-beautiful-dnd"
import IssueAdd from "@/components/cards/IssueAdd"

export function withStatus<T>(Component: ComponentType<T>, status: string) {
  return (hocProps: Omit<T, '_id' | 'title' | 'description' | 'createdAt' | 'index' | 'rank'>) => {
    const { state } = useBoard()

    const filteredIssues = () => {
      switch (status) {
        case 'to-do':
          return state.issues.filter(issue => 
            issue.status === 'to-do').sort(sortByLexoRankAsc)
        case 'in-progress':
          return state.issues.filter(issue => 
            issue.status === 'in-progress').sort(sortByLexoRankAsc)
        case 'done':
          return state.issues.filter(issue => 
            issue.status === 'done').sort(sortByLexoRankAsc)
        default:
          return []
      }
    }

    const issues = filteredIssues()

    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
        <div className="px-4 py-2">
          <div className="flex justify-items-center mt-1 mb-3">
            {status === 'to-do' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">To Do</h3>}
            {status === 'in-progress' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">In Progress</h3>}
            {status === 'done' && <h3 className="inline-flex flex-col justify-center font-semibold flex-1">Done</h3>}
          </div>

          <Droppable droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-4"
              >
                <Suspense fallback={<div>...Loading</div>}>
                  {issues.length > 0 && issues.map((issue, index) => (
                    <Component
                      {...(hocProps as T)}
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
}