"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ModeToggler } from "./ModeToggler"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"


export default function NavMenu() {
    const [showBg, setShowBg] = useState(false)
    const [open, setOpen] = useState<boolean>(false)
    const handleScroll = () => {
        if (window.scrollY > 70) {
            setShowBg(true)
        } else {
            setShowBg(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className={`sticky !container  z-10 top-6 `}>
            <NavigationMenu dir="rtl" className={`!container items-center rounded-xl py-4 px-8 ${showBg && !open ? "shadow-md transition-all duration-700 h-20 bg-gray-800/30 backdrop-blur dark:bg-slate-700/30" : ""} justify-between hidden gap-2 md:flex h-full`}>
                <Image className="ml-auto" src="https://okab.pixeldima.com/business-rtl/wp-content/uploads/sites/6/2021/01/okab-ar.png" width={130} height={32} alt="logo" />
                <NavigationMenuList className="items-center justify-between hidden gap-2 md:flex ">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>الرئيسية</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#about" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>من نحن</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#contact" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>اتصل بنا</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#services" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>الخدمات</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ModeToggler />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {/* Nav for small screens */}
            <div className={`flex items-center justify-between h-full md:hidden rounded-xl py-4 px-8 my-8 ${showBg && !open ? "shadow-md transition-all duration-700 h-20 bg-gray-800/30 backdrop-blur dark:bg-slate-700/30" : ""}`}>
                <Image className="ml-auto" src="https://okab.pixeldima.com/business-rtl/wp-content/uploads/sites/6/2021/01/okab-ar.png" width={130} height={32} alt="logo" />
                <Popover onOpenChange={setOpen} open={open}>
                    <PopoverTrigger asChild>
                        <div className="flex gap-2">
                            <ModeToggler />
                            <Button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="relative w-screen">
                        <div className="flex flex-col items-center mx-auto md:flex-row">
                            <NavigationMenu>
                                <NavigationMenuList className="flex flex-col items-center justify-center gap-2">
                                    <NavigationMenuItem>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuLink onClick={() => setOpen(false)} className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/posts" legacyBehavior passHref>
                                            <NavigationMenuLink onClick={() => setOpen(false)} className={navigationMenuTriggerStyle()}>Posts</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/profile" legacyBehavior passHref>
                                            <NavigationMenuLink onClick={() => setOpen(false)} className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </header>
    )
}