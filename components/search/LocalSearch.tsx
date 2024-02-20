"use client"

import React                from "react"
import Image                from "next/image"
import { Input }            from "@/components/ui/input"
import debounce             from "lodash/debounce"
import { 
  usePathname, 
  useSearchParams, 
  useRouter, 
  ReadonlyURLSearchParams}  from "next/navigation"

interface CustomInputProps {
  iconPosition: string;
  imgSrc: string;
  placeholder?: string;
  otherClasses?: string;
}

const LocalSearch = ({
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const useSearchParamsWithQ = useSearchParams as () => ReadonlyURLSearchParams & {
    q: string;
  }
  const searchParams = useSearchParamsWithQ()
  const pathname = usePathname()
  const { replace } = useRouter()
  const { q: inputQuery } = searchParams ?? { q: "" }

  const onChangeHandler = debounce(async (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    await replace(`${pathname}?${params.toString()}`)
  }, 1000)

  return (
    <div
      className={`background-light800_darkgradient
      relative flex min-h-[56px] grow
      items-center gap-4 rounded-[10px] px-4 mx-3 mb-8 ${otherClasses}`}
    >
      {iconPosition === 'left' && (<Image
        src={imgSrc}
        alt="search"
        width={24}
        height={24}
        className={`cursor-pointer`}
      />)}
      <Input
        type="text"
        placeholder={placeholder}
        value={inputQuery}
        className="
          paragraph-regular
          no-focus placeholder
          text-dark400_light700
          background-light800_darkgradient
          border-none shadow-none outline-none
        "
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      {iconPosition === 'right' && (<Image
        src={imgSrc}
        alt="search"
        width={24}
        height={24}
        className={`cursor-pointer`}
      />)}
    </div>
  )
}

export default LocalSearch
