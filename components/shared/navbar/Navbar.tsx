"use client"

// import styles                   from "./navbar.module.css"
import Link                     from "next/link"
import Image                    from "next/image"
import Theme                    from "@/components/shared/navbar/Theme";
import MobileNav                from "@/components/shared/navbar/MobileNav";
import GlobalSearch             from "@/components/search/GlobalSearch";

import { Button }               from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between
      background-light900_dark200 fixed z-50
      w-full gap-5 p-6 shadow-light-300
      dark:shadow-none sm:px-12
    ">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow"
        />
        <p className="h2-bold font-spaceGrotesk
          text-dark-100 dark:text-light-900
          max-sm:hidden
        ">Kanban <span className="text-primary-500">Board</span></p>
      </Link>
      
      
      <GlobalSearch />

      <Button type="button">
        Load
      </Button>
      
      <div className="flex-between gap-5">
        
        <Theme />
        
        <MobileNav/>
        
      </div>
    </nav>
  )
}

export default Navbar
