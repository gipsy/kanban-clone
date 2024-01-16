"use client"

import React, { 
  useState }                from "react"
import Image                from "next/image"
import { Input }            from "@/components/ui/input"
import { useBoard }         from "@/context/BoardProvider"
import { 
  usePathname, 
  useSearchParams, 
  useRouter }               from "next/navigation"

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder?: string;
  otherClasses?: string;
  issues: string;
}

const LocalSearch = ({
  // route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
  // issues
}: CustomInputProps) => {
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
