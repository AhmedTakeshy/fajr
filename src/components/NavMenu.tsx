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
import { buttonVariants, Button } from "./ui/button"
import Image from "next/image"
import { useState } from "react"


export default function NavMenu() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div>

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
                <div className="flex flex-col w-full md:w-full md:hidden">
                    <div className="flex flex-col items-center justify-center gap-3 p-4 mt-4 font-medium rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:dark:bg-gray-900">
                        <ModeToggler className="hidden md:inline-block" />
                    </div>
                </div>
            </div>
            <NavigationMenu>
                <NavigationMenuList className="items-center justify-center hidden gap-2 md:flex">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/posts" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Posts</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/profile" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}