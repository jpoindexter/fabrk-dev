"use client"

import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const MENU_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const

interface NavMenuItemsProps {
  className?: string
}

const NavMenuItems = ({ className }: NavMenuItemsProps) => (
  <div className={`flex flex-col md:flex-row gap-2 ${className ?? ""}`}>
    {MENU_ITEMS.map(({ label, href }) => (
      <Link key={label} href={href}>
        <Button variant="ghost" className="w-full md:w-auto smooth-transition text-sm font-normal">
          {label}
        </Button>
      </Link>
    ))}
  </div>
)

export function LpNavbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <nav className="sticky top-0 z-50 glass py-4 md:py-5 isolate">
      <div className="container relative px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 m-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-2">
          <NavMenuItems />
          <Link href="/auth/signin">
            <Button className="ml-4 rounded-full smooth-transition hover:scale-105">Get started</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 w-full pb-2">
            <NavMenuItems />
            <Link href="/auth/signin">
              <Button className="w-full rounded-full">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
