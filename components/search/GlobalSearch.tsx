"use client"

import React                    from "react"
import Image                    from "next/image"
import { Input }                from "@/components/ui/input"
import { 
  usePathname, 
  useSearchParams, useRouter, ReadonlyURLSearchParams }  from "next/navigation"

const GlobalSearch = () => {
  const useSearchParamsWithQ = useSearchParams as () => ReadonlyURLSearchParams & {
    q: string;
  }
  const searchParams = useSearchParamsWithQ()
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
