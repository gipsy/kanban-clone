import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Props {
  status: string;
}

const IssueAdd = ({
  status
}: Props) => {
  return (
    <Link 
      href={`?modal=true&status=${status}`}
      className="mb-1 w-full rounded-[10px] p-2 text-dark-300 hover:bg-light-700 dark:text-light-700 dark:hover:bg-dark-400"
    >
      <Button variant="ghost" className="h-8 w-full justify-start p-0 text-inherit hover:bg-transparent">
        <Image
          src="/assets/icons/plus.svg"
          alt="add new issue"
          width={10} height={10}
          className="add-issue mr-2"
        />
        Add an Issue
      </Button>
    </Link>
  )
}

export default IssueAdd