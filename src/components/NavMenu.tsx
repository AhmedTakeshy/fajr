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
import { useState } from "react"


export default function NavMenu() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <NavigationMenu dir="rtl" className="items-center justify-between hidden gap-2 md:flex my-8 !container sticky top-4 w-full">
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