import React            from 'react'
import { getTimestamp } from "@/lib/utils"
import Link             from "next/link";

interface BoardProps {
  _id: string;
  title: string;
  createdAt: Date;
}

const BoardItem = ({
  _id,
  title,
  createdAt
}: BoardProps) => {
  return (
    <Link className="board-link bg-gray-100 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-300 p-2" href={`board/${_id}`}>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs">{getTimestamp(createdAt)}</p>
    </Link>
  )
}

export default BoardItem;
