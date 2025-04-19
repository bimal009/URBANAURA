"use client";
import Link from 'next/link';
import React from 'react';
import Search from './features/Search';
import User from './features/User';
import Cart from './features/cart';
import { useMediaStatus } from './hooks/use-mobile';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';

const Navlinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    const { isWide } = useMediaStatus();

    return (
        <nav className="relative">
            {/* Main Navbar */}
            <div className='px-4 lg:px-12 py-4 flex items-center bg-primary w-full'>
                {/* Mobile Menu Button - Only visible on mobile */}
                {isWide && (
                    <div className="mr-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="flex items-center justify-center p-2 bg-white rounded-md shadow-md">
                                    <Menu className="h-5 w-5 text-primary" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64">
                                <SheetHeader className="mb-4">
                                    <SheetTitle>
                                        <div className="logo font-medium text-xl text-primary">
                                            <Link href="/">URBANAURA</Link>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="links">
                                    {Navlinks.map((item, index) => (
                                        <div key={index} className='text-black border-b font-medium py-3 px-1'>
                                            <Link href={item.href}>{item.label}</Link>
                                        </div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}

                {/* Logo - Only shown on desktop */}
                <div className="logo font-medium text-xl text-secondary hidden lg:block">
                    <Link href="/">URBANAURA</Link>
                </div>

                {/* Navigation links - only shown on desktop */}
                <div className="links gap-7 hidden lg:flex ml-12">
                    {Navlinks.map((item, index) => (
                        <div key={index} className='text-white/90 hover:text-white'>
                            <Link href={item.href}>{item.label}</Link>
                        </div>
                    ))}
                </div>

                {/* Spacer to push icons to the right */}
                <div className="flex-grow"></div>

                {/* Icons section */}
                <div className="flex gap-2 md:gap-3 items-center">
                    <Search />
                    <User />
                    <Cart />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;