"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground">
            {/* Newsletter Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-secondary/10 rounded-2xl p-6 md:p-10 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">Join Our Newsletter</h3>
                            <p className="text-primary-foreground/80">
                                Stay updated with new arrivals, exclusive offers and style inspiration.
                            </p>
                        </div>
                        <div>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-background border-0 text-foreground rounded-full px-5 py-2 flex-grow h-12"
                                    required
                                />
                                <Button type="submit" className="whitespace-nowrap bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-full px-6 h-12">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
                    {/* Column 1: About */}
                    <div>
                        <h4 className="font-bold text-xl mb-4">URBANAURA</h4>
                        <p className="text-primary-foreground/80 mb-6">
                            Modern urban fashion for those who appreciate contemporary elegance with a timeless appeal.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://instagram.com" className="hover:text-secondary transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://facebook.com" className="hover:text-secondary transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </Link>
                            <Link href="https://twitter.com" className="hover:text-secondary transition-colors" aria-label="Twitter">
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/products/new-arrivals", label: "New Arrivals" },
                                { href: "/products/best-sellers", label: "Best Sellers" },
                                { href: "/products/sale", label: "Sale" },
                                { href: "/products/collections", label: "Collections" },
                                { href: "/products/accessories", label: "Accessories" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-primary-foreground/80 hover:text-secondary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Information */}
                    <div>
                        <h4 className="font-bold mb-4">Information</h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/sustainability", label: "Sustainability" },
                                { href: "/careers", label: "Careers" },
                                { href: "/terms", label: "Terms & Conditions" },
                                { href: "/privacy", label: "Privacy Policy" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-primary-foreground/80 hover:text-secondary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span className="text-primary-foreground/80">
                                    123 Fashion Street, Urban City 10001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="flex-shrink-0" />
                                <span className="text-primary-foreground/80">
                                    (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="flex-shrink-0" />
                                <span className="text-primary-foreground/80">
                                    contact@urbanaura.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-primary-foreground/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-primary-foreground/70 mb-4 md:mb-0">
                            © 2025 URBANAURA. All rights reserved.
                        </div>

                        <div className="text-sm text-primary-foreground/70 mb-4 md:mb-0">
                            Designed and Developed By Bimal Pandey
                        </div>
                        <div className="flex items-center gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <Image
                                    fill
                                    key={item}
                                    src="/api/placeholder/40/25"
                                    alt={`Payment Method ${item}`}
                                    className="h-6"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;