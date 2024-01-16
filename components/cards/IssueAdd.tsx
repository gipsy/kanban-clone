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
      className="w-full p-2 mb-1 rounded-[10px] hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-300"
    >
      <Button className="p-0 h-8">
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