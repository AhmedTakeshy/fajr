"use client"

import * as React from "react"
import { CgMoon as Moon, CgSun as Sun } from "react-icons/cg"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Props = {
    className?: string
}

export function ModeToggler({ className }: Props) {
    const { setTheme } = useTheme()
    const [black, setBlack] = useState(true)
    const pathname = usePathname()

    const handleScroll = () => {
            if (window.scrollY >= 900) {
            setBlack(false)
            } else {
                setBlack(true)
            }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" style={black && pathname === "/" ? { color: "black" }:{}} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem  onClick={() => setTheme("light")}>
                    مضئ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    مظلم
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    نظام
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
