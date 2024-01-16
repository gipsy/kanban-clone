import React            from 'react'
import { getTimestamp } from "@/lib/utils"
import Link             from "next/link"
import Image            from 'next/image'
import { Button }       from "@/components/ui/button"
import { deleteBoard }  from "@/lib/actions/board.action"
import { pluralize }    from "@/lib/utils"

interface BoardProps {
  _id: string;
  title: string;
  createdAt: Date;
  issuesCount: number;
}

const BoardItem = ({
  _id,
  title,
  createdAt,
  issuesCount
}: BoardProps) => {

  const onDeleteBoardHandler = async (data) => {
    "use server"
    const boardId = data.get('boardId')
    await deleteBoard({_id, path: '/board'})
  }

  return (
    <form action={onDeleteBoardHandler}>
      <input name="boardId" className="hidden" defaultValue={_id}/>
      <div className="flex board-link bg-gray-100 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-300 p-2">
        <Link 
          className="flex-1"
          href={`board/${_id}`}
        >
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs">{getTimestamp(createdAt)}</p>
        </Link>
        <div className="flex-0 m-auto pr-2">
          <p className="text-xs">{ pluralize(issuesCount, 'Issue') }</p>
        </div>
        <div className="flex-none m-auto">
          <Button
            type="submit"
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
    </form>
  )
}

export default BoardItem;
