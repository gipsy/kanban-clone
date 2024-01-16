"use client"

import React, { 
  useState, useCallback }       from "react"
import Image                from "next/image"
import { Input }            from "@/components/ui/input"
import { useBoard }         from "@/context/BoardProvider"

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
  issues
}: CustomInputProps) => {
  const { state, dispatch } = useBoard()
  const [input, setInput] = useState({value: ''})

  const onChangeHandler = (e) => {

    const filteredIssues = issues.filter(issue => {
      return issue.title.includes(e.target.value)
    })

    dispatch({
      type: "FILTER_ISSUES",
      payload: { issues: filteredIssues }
    })

    setInput((prevState) => {
      return ({
        ...prevState,
        value: e.target.value
      })
    })
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
        value={input.value}
        className="
          paragraph-regular
          no-focus placeholder
          text-dark400_light700
          background-light800_darkgradient
          border-none shadow-none outline-none
        "
        onChange={(e) => onChangeHandler(e)}
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
