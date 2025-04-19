"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
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
    SheetClose
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';

const Navlinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

// Additional quick links to be displayed beside search
const QuickLinks = [
    { href: "/new-arrivals", label: "New" },
    { href: "/sale", label: "Sale" },
    { href: "/trending", label: "Trending" },
];

const Navbar = () => {
    const { isWide } = useMediaStatus();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            {/* Main Navbar */}
            <div className={`px-3 sm:px-4 lg:px-12 py-3 sm:py-4 flex items-center bg-primary w-full transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : ''}`}>
                {/* Mobile Menu Button - Only visible on mobile */}
                {isWide && (
                    <div className="mr-2">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <button className="flex items-center justify-center p-2 bg-white rounded-md shadow-md">
                                    <Menu className="h-5 w-5 text-primary" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 sm:w-80 p-0 border-r-0">
                                <div className="h-full flex flex-col">
                                    <SheetHeader className="p-4 border-b">
                                        <div className="flex items-center justify-between">
                                            <SheetTitle className="m-0">
                                                <div className="logo font-medium text-xl text-primary">
                                                    <Link href="/" onClick={() => setIsSheetOpen(false)}>URBANAURA</Link>
                                                </div>
                                            </SheetTitle>
                                            <SheetClose >

                                            </SheetClose>
                                        </div>
                                        <SheetDescription className='sr-only'>
                                            Navigate to different Pages
                                        </SheetDescription>
                                    </SheetHeader>

                                    <div className="flex-1 overflow-y-auto py-2">
                                        <div className="links">
                                            {Navlinks.map((item, index) => (
                                                <SheetClose asChild key={index}>
                                                    <Link href={item.href}>
                                                        <div className='text-black border-b font-medium py-4 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors'>
                                                            {item.label}
                                                        </div>
                                                    </Link>
                                                </SheetClose>
                                            ))}

                                            {/* Quick links in mobile menu */}
                                            <div className="mt-4 pt-2 px-4 border-t">
                                                <div className="text-sm text-gray-500 mb-2">Quick Links</div>
                                                <div className="flex flex-wrap gap-3">
                                                    {QuickLinks.map((item, index) => (
                                                        <SheetClose asChild key={`quick-${index}`}>
                                                            <Link href={item.href}>
                                                                <div className='text-white bg-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors'>
                                                                    {item.label}
                                                                </div>
                                                            </Link>
                                                        </SheetClose>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile menu footer */}
                                    <div className="border-t p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500">© 2025 UrbanAura</div>
                                            <div className="flex gap-4">
                                                <User />
                                                <Cart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}

                {/* Logo - Visible on all screens, but centered on mobile */}
                <div className={`logo font-medium text-xl text-secondary  hidden lg:flex`}>
                    <Link href="/">URBANAURA</Link>
                </div>

                {/* Navigation links - only shown on desktop */}
                <div className="links gap-7 hidden lg:flex ml-12">
                    {Navlinks.map((item, index) => (
                        <div key={index} className='text-white/90 hover:text-white transition-colors'>
                            <Link href={item.href}>{item.label}</Link>
                        </div>
                    ))}
                </div>

                {/* Spacer to push icons to the right */}
                <div className="flex-grow"></div>

                {/* Quick links beside search - visible on medium screens and up */}
                <div className="hidden md:flex gap-5 mr-6">
                    {QuickLinks.map((item, index) => (
                        <div key={`quick-${index}`} className='text-white/90 hover:text-white text-sm font-medium transition-colors'>
                            <Link href={item.href}>{item.label}</Link>
                        </div>
                    ))}
                </div>

                {/* Icons section - improved spacing for mobile */}
                <div className="flex items-center">
                    {/* Desktop search */}
                    <div className="hidden sm:block">
                        <Search />
                    </div>

                    {/* Mobile-optimized icons with better spacing */}
                    <div className="flex items-center">
                        {/* Search button only visible on smallest screens */}
                        <div className="block sm:hidden mr-2">
                            <Search />
                        </div>

                        {/* User icon - now visible on both mobile and desktop */}
                        <div className="mx-2 sm:mx-3"><User /></div>

                        {/* Cart icon - always visible */}
                        <div><Cart /></div>
                    </div>
                </div>
            </div>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-14 sm:h-16"></div>
        </nav>
    );
};

export default Navbar;