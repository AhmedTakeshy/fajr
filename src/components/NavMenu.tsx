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


export default function NavMenu() {
    const [showBg, setShowBg] = useState(false)

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
        <NavigationMenu dir="rtl" className={`${showBg ?"shadow-md transition-all duration-700 h-20 bg-gray-800/30 backdrop-blur dark:bg-slate-700/30":""} items-center rounded-xl justify-between hidden gap-2 md:flex my-8 !container sticky top-6 w-full`}>
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
    )
}