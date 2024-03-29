import React            from 'react'
import { getTimestamp } from "@/lib/utils"
import { ActionKind, useBoard }     from "@/context/BoardProvider"
import { useRouter }    from "next/navigation"
import { Draggable }    from "react-beautiful-dnd"
import Image            from "next/image"
import { Button }       from "@/components/ui/button"
import { useParams }    from "next/navigation"
import { 
  deleteIssue
} from '@/lib/actions/issue.action'

interface IssueProps {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  index: number;
  rank: string;
}

const IssueCard = ({
  _id,
  title,
  description,
  createdAt,
  index,
  rank,
}: IssueProps) => {
  const { state, dispatch } = useBoard()
  const router = useRouter()
  const params = useParams()

  const onEditIssueHandler = async () => {
    const issue = state.issues.find(issue => issue._id === _id)
    if (issue) {
      dispatch({
        type: ActionKind.setEditedIssueAction,
        payload: { issue }
      })
    }
    router.replace(`?modal=true&id=${_id}`)
  }

  const onDeleteIssueHandler = async () => {
    const boardId = params.id as string
    try {
      await deleteIssue({_id, boardId, path: '/'})
      dispatch({
        type: ActionKind.deleteIssueAction,
        payload: { _id }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card-wrapper
            rounded-[10px] py-2 sm:px-4
          "
        >
          <div>
            <h4>{rank}</h4>
            <h4 className="mb-4">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex justify-items-center mt-5">
            <div className="inline-flex justify-center flex-col text-xs flex-1 cursor-default">{getTimestamp(new Date(createdAt))}</div>
            <div className="flex-none">
              <div className="flex">
                <Button
                  onClick={
                    () => onEditIssueHandler()
                  }
                  className="p-1 w-7 h-7 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-300"
                >
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit issue"
                    width={19} height={19}
                    className="edit-issue"
                  />
                </Button>
                <Button
                  onClick={
                    () => onDeleteIssueHandler()
                  }
                  className="p-1 w-7 h-7 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-300"
                >
                  <Image
                    src="/assets/icons/trash.svg"
                    alt="remove issue"
                    width={19} height={19}
                    className="remove-issue"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default IssueCard;
