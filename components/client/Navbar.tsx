"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import User from './features/User';

import { useMediaStatus } from './hooks/use-mobile';
import { Search } from 'lucide-react';

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
import { useRouter } from 'next/navigation';
import { CartCount } from './cart-count';

const Navlinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    const router = useRouter();
    const { isWide } = useMediaStatus();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Set isClient to true on mount
    useEffect(() => {
        setIsClient(true);
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const QuickLinks = [
        ...(!token ? [{ href: "/login", label: "Login" }] : []),
    ];

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

    // Don't render QuickLinks until client-side hydration is complete
    const renderQuickLinks = () => {
        if (!isClient) return null;
        return QuickLinks.map((item, index) => (
            <div key={`quick-${index}`} className='text-white/90 hover:text-white text-sm font-medium transition-colors px-2'>
                <Link href={item.href}>{item.label}</Link>
            </div>
        ));
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Main Navbar */}
            <div className={`px-4 sm:px-10 lg:px-40 overflow-x-hidden py-4   flex items-center justify-between bg-primary w-auto  transition-all duration-300 ${isScrolled ? 'py-3' : ''}`}>
                <div className="flex items-center">
                    {/* Mobile Menu Button - Only visible on mobile */}
                    {isWide && (
                        <div className="mr-4">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <button
                                        className="flex items-center justify-center p-2 bg-white rounded-md shadow-md focus:outline-none"
                                        aria-label="Open navigation menu"
                                    >
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
                                                <SheetClose aria-label="Close navigation menu" className="focus:outline-none" />
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
                                            </div>
                                        </div>

                                        {/* Mobile menu footer */}
                                        <div className="border-t p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-500">© 2025 UrbanAura</div>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    )}

                    {/* Logo - Visible on all screens */}
                    <div className="logo font-medium text-xl text-white">
                        <Link href="/">URBANAURA</Link>
                    </div>

                    {/* Navigation links - only shown on desktop */}
                    <div className="links gap-7 hidden lg:flex ml-12">
                        {Navlinks.map((item, index) => (
                            <div key={index} className='text-white/90 hover:text-white transition-colors px-2'>
                                <Link href={item.href}>{item.label}</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side container */}
                <div className="flex items-center gap-2">
                    {/* Quick links beside search - visible on medium screens and up */}
                    <div className="hidden md:flex gap-5">
                        {renderQuickLinks()}
                    </div>

                    {/* Search icon */}
                    <div className="flex items-center justify-center h-8 w-8">
                        <button
                            onClick={() => router.push(`/products`)}
                            aria-label="Search products"
                            className="flex items-center justify-center focus:outline-none"
                        >
                            <Search className='text-white' size={20} />
                        </button>
                    </div>

                    {/* User icon */}
                    <div className="flex items-center justify-center h-8 w-8">
                        <User />
                    </div>

                    {/* Cart icon */}
                    <div className="flex items-center justify-center h-8 w-8">
                        <CartCount />
                    </div>
                </div>
            </div>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-20 sm:h-24"></div>
        </nav>
    );
};

export default Navbar;