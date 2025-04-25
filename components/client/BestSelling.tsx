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
    id: string;
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
    // Sample product data
    const bestSellingProducts: Product[] = [
        {
            id: "1",
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
        {
            id: "2",
            name: "Classic Denim Jacket",
            price: 129.99,
            originalPrice: 159.99,
            rating: 4.8,
            reviewCount: 189,
            image: "/api/placeholder/500/600",
            category: "Jackets",
            isNew: false,
            discount: 20,
        },
        {
            id: "3",
            name: "Premium Cotton T-Shirt",
            price: 39.99,
            originalPrice: 49.99,
            rating: 4.7,
            reviewCount: 312,
            image: "/api/placeholder/500/600",
            category: "T-Shirts",
            isNew: false,
            discount: 15,
        }
    ];

    const renderProductCard = (product: Product) => {
        return (
            <Cards
                key={`best-selling-${product.id}`}
                product={{
                    hideHeart: true,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    rating: product.rating,
                    reviewCount: product.reviewCount,
                    image: product.image,
                    category: product.category,
                    isNew: product.isNew,
                    discount: product.discount
                }}
            />
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Best Selling Products</h1>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                    Discover our most popular items that customers can&apos;t get enough of.
                </p>
            </div>

            {/* Responsive grid for desktop and tablet */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {bestSellingProducts.map(renderProductCard)}
            </div>

            {/* Carousel for mobile */}
            <div className="sm:hidden">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {bestSellingProducts.map((product) => (
                            <CarouselItem key={`best-selling-mobile-${product.id}`} className="basis-3/4">
                                {renderProductCard(product)}
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