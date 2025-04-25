"use client";

import React from "react";


// Import ShadCN components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


import Cards from "./card";

// Product type definition
type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    isNew: boolean;
    discount: number;
};





const BestSellingPage: React.FC = () => {
    // Sample product data - same as before
    const bestSellingProducts: Product[] = [
        {
            id: 1,
            name: "Urban Comfort Hoodie",
            price: 89.99,
            originalPrice: 119.99,
            rating: 4.9,
            reviewCount: 245,
            image: "/api/placeholder/500/600",
            category: "Hoodies",
            isNew: true,
            discount: 25,
        },
        // ... other products ...
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Best Selling Products</h1>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                    Discover our most popular items that customers can't get enough of.
                </p>
            </div>

            {/* Responsive grid for desktop and tablet */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {bestSellingProducts.map((product) => (
                    <Cards key={product.id} product={product} />
                ))}
            </div>

            {/* Carousel for mobile */}
            <div className="sm:hidden">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {bestSellingProducts.map((product) => (
                            <CarouselItem key={product.id} className="basis-3/4">
                                <Cards product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-background shadow-md border-border h-8 w-8" />
                    <CarouselNext className="right-0 bg-background shadow-md border-border h-8 w-8" />
                </Carousel>
            </div>
        </div>
    );
};

export default BestSellingPage;