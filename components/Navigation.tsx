"use client"
import React, { useState } from 'react'
import NavButton from './NavButton';
import {useMedia} from "react-use";
import { usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import {Menu} from "lucide-react";
const routes = [
    {
        href: "/",
        label: "Overview"
    },
    {
        href: "/transactions",
        label: "transactions" 
    },
    {
        href: "/accounts",
        label: "accounts" 
    },
    {
        href: "/categories",
        label: "categories" 
    },
    {
        href: "/settings",
        label: "settings" 
    },
]


function Navigation() {
    const [isopen, setopen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const onClick = (href:string) => {
        router.push(href);
        setopen(false);
    }

    if(isMobile){
        return(
            <Sheet open={isopen} onOpenChange={setopen} >
                <SheetTrigger>
                    <Button variant="outline" size="sm" className='font-normal hover:bg-white/10 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'>
                        <Menu className='h-4 w-4 '/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className='px-2'>
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {routes.map((route) => (
                            <Button key={route.href} variant={route.href == pathname ? 'secondary' : 'ghost'} onClick={() => onClick(route.href)} className="w-full justify-start">{route.label} </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }
  return (
    <div className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
      {
        routes.map((route) => 
        (
                <NavButton key={route.href} href={route.href} label={route.label} isActive={pathname === route.href}/>
        ))
      }
    </div>
  )
}

export default Navigation
