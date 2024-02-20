"use client"

import React            from 'react'
import { getTimestamp } from "@/lib/utils"
import Link             from "next/link"
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

  const TrashIcon = () => {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.75 3.5H2.91667H12.25" stroke="#FF2121" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.0832 3.50008V11.6667C11.0832 11.9762 10.9603 12.2729 10.7415 12.4917C10.5227 12.7105 10.2259 12.8334 9.91651 12.8334H4.08317C3.77375 12.8334 3.47701 12.7105 3.25821 12.4917C3.03942 12.2729 2.9165 11.9762 2.9165 11.6667V3.50008M4.6665 3.50008V2.33341C4.6665 2.024 4.78942 1.72725 5.00821 1.50846C5.22701 1.28966 5.52375 1.16675 5.83317 1.16675H8.1665C8.47592 1.16675 8.77267 1.28966 8.99146 1.50846C9.21026 1.72725 9.33317 2.024 9.33317 2.33341V3.50008" stroke="#FF2121" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }

  return (
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
          onClick={() => deleteBoard({_id, path: '/board'})}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}

export default BoardItem;
