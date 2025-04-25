"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Star, Award } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 rounded-bl-[200px] -z-10"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent/20 -z-10"></div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-4">
                                <TrendingUp className="h-4 w-4 mr-2" />
                                New Collection 2025
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                                Elevate Your <span className="text-primary">Style</span> With Urban Essentials
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                            Discover the latest trends in urban fashion curated for those who appreciate modern elegance with timeless appeal.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/products"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6 py-3 flex items-center transition-all"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 pt-6">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                                <span className="text-sm font-medium">4.9/5 Customer Rating</span>
                            </div>
                            <div className="flex items-center">
                                <Award className="h-5 w-5 text-blue-500 mr-1" />
                                <span className="text-sm font-medium">Premium Quality</span>
                            </div>
                            <div className="hidden md:flex items-center">
                                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-1">
                                    <span className="text-xs text-primary-foreground font-bold">24</span>
                                </div>
                                <span className="text-sm font-medium">Hour Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div className="bg-secondary rounded-3xl overflow-hidden shadow-lg aspect-[4/5] md:aspect-[4/3] relative">
                            {/* This would be an actual image in production */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/5">
                                <div className="text-center">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <span className="text-primary font-medium text-lg">
                                            <Image src="/hero.jpg" alt='hero img' fill className='object-cover' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -bottom-4 -left-4 md:-left-8 bg-background border border-border p-4 rounded-2xl shadow-md w-40">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center px-2">
                                    <span className="text-primary-foreground font-bold ">30%</span>
                                </div>
                                <div className="ml-3">
                                    <div className="text-xs text-muted-foreground">Limited offer</div>
                                    <div className="text-sm font-medium">Sale Ends Soon</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 right-12 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <span className="font-bold">NEW</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;