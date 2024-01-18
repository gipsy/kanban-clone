import "./globals.css"
import "../styles/prism.css"
import React                    from "react"
import type { Metadata }        from "next"
import Navbar                   from "@/components/shared/navbar/Navbar"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider }        from "@/context/ThemeProvider"
import { BoardProvider }        from "@/context/BoardProvider"

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata: Metadata = {
  title: 'KanbanClone',
  description: 'Kanban Clone based on Next14 and MongoDB',
  icons: {
    'icon': '/assets/images/site-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <BoardProvider>
            <Navbar />
            {children}
          </BoardProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
