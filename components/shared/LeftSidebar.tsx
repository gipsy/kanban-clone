"use client"

import React from 'react'

import Link          from "next/link"
import Image            from "next/image"
import { sidebarLinks } from "@/constants"
import { usePathname }  from "next/navigation"

const LeftSidebar = () => {
  const pathname = usePathname()
  
  return (
    <section className="
      custom-scrollbar
      background-light900_dark200
      light-border
      sticky
      left-0
      top-0
      flex
      h-screen
      w-fit
      flex-col
      justify-between
      overflow-y-auto
      border-r
      p-6
      pt-36
      shadow-light-300
      dark:shadow-none
      max-sm:hidden
      lg:w-[266px]
    ">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route)
            && item.route.length > 1) || pathname === item.route
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSidebar
