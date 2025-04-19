"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const categories = [
    {
        id: 1,
        name: "Urban Essentials",
        description: "Everyday staples designed for city life",
        image: "/api/placeholder/600/800",
        link: "/categories/essentials"
    },
    {
        id: 2,
        name: "Street Style",
        description: "Bold statements for the fashion-forward",
        image: "/api/placeholder/600/800",
        link: "/categories/street"
    },
    {
        id: 3,
        name: "Modern Classics",
        description: "Timeless pieces with contemporary twists",
        image: "/api/placeholder/600/800",
        link: "/categories/classics"
    },
    {
        id: 4,
        name: "Active Wear",
        description: "Performance meets style for everyday movement",
        image: "/api/placeholder/600/800",
        link: "/categories/active"
    }
];

const CategorySection = () => {
    return (
        <section className="py-16 bg-background select-none">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Shop By Category</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collections designed for the modern urban lifestyle
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="group relative overflow-hidden rounded-xl">
                            {/* Category Image */}
                            <div className="aspect-[3/4] overflow-hidden">
                                <Image
                                    fill
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Category Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                                <p className="text-white/80 mb-4 text-sm">{category.description}</p>
                                <Link href={category.link}>
                                    <div className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                                        Shop Now <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;