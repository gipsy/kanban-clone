"use client"

import React, { 
  useState, useEffect
}                               from "react"
import Image                    from "next/image"
import { Input }                from "@/components/ui/input"
import { Button }               from "@/components/ui/button"
import { 
  usePathname, 
  useSearchParams, useRouter }  from "next/navigation"

// interface GlobalSearchParams {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

const GlobalSearch = ({
  // searchParams
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const { q: inputQuery } = searchParams ?? { q: "" }

  const onChangeHandler = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      className="flex
      relative w-full
      max-w-[600px] max-lg:hidden
    ">
      <div
        className="background-light800_darkgradient
        relative flex min-h-[56px] grow
        items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search boards by title"
          value={inputQuery}
          className="
            paragraph-regular
            no-focus placeholder
            background-light800_darkgradient border-none
            shadow-none outline-none
          "
          onChange={(e) => {
            onChangeHandler(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default GlobalSearch
