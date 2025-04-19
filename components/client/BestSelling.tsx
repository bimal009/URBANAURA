"use client";

import React from "react";
import Link from "next/link";
import { StarIcon, ShoppingCart, Heart } from "lucide-react";

// Import ShadCN components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

// Sample product data - replace with your actual data
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
    {
        id: 2,
        name: "Downtown Sneakers",
        price: 159.99,
        originalPrice: 189.99,
        rating: 4.8,
        reviewCount: 182,
        image: "/api/placeholder/500/600",
        category: "Footwear",
        isNew: false,
        discount: 15,
    },
    {
        id: 3,
        name: "Metro Slim Jeans",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.7,
        reviewCount: 158,
        image: "/api/placeholder/500/600",
        category: "Bottoms",
        isNew: false,
        discount: 20,
    },
    {
        id: 4,
        name: "City Lights Jacket",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.9,
        reviewCount: 136,
        image: "/api/placeholder/500/600",
        category: "Outerwear",
        isNew: true,
        discount: 20,
    },
    {
        id: 5,
        name: "Skyline Watch",
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviewCount: 97,
        image: "/api/placeholder/500/600",
        category: "Accessories",
        isNew: false,
        discount: 20,
    },
    {
        id: 6,
        name: "Urban Essentials T-Shirt",
        price: 39.99,
        originalPrice: 49.99,
        rating: 4.6,
        reviewCount: 211,
        image: "/api/placeholder/500/600",
        category: "Tops",
        isNew: false,
        discount: 20,
    },
    {
        id: 7,
        name: "Metropolitan Backpack",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.8,
        reviewCount: 75,
        image: "/api/placeholder/500/600",
        category: "Accessories",
        isNew: true,
        discount: 25,
    },
    {
        id: 8,
        name: "City Breeze Shirt",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.7,
        reviewCount: 124,
        image: "/api/placeholder/500/600",
        category: "Tops",
        isNew: false,
        discount: 25,
    },
];

// Helper function to render stars
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating)
                        ? "text-chart-4 fill-chart-4"
                        : i < rating
                            ? "text-chart-4 fill-chart-4 opacity-50"
                            : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Card className="rounded-xl overflow-hidden border-border h-full flex flex-col">
            <CardHeader className="p-0 relative aspect-[3/4] overflow-hidden group">
                <Image
                    fill
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                {product.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-white font-medium">
                        {product.discount}% OFF
                    </Badge>
                )}
                {product.isNew && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-medium">
                        NEW
                    </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 shadow-md">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="rounded-full h-9 w-9 shadow-md bg-primary hover:bg-primary/90">
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-4 flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                        {product.category}
                    </Badge>
                    <div className="flex items-center">
                        <RatingStars rating={product.rating} />
                        <span className="text-xs ml-2 text-muted-foreground">({product.reviewCount})</span>
                    </div>
                </div>
                <h3 className="font-medium text-foreground mt-2 mb-1 hover:text-primary transition-colors">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center">
                    <span className="text-primary font-semibold mr-2">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-muted-foreground text-sm line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-0 pb-4">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

// Main Best Selling Page Component
const BestSellingPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-3 text-foreground">Best Selling Products</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our most popular items that customers can't get enough of.
                    Quality, style, and comfort - these bestsellers have it all.
                </p>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block mb-16">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                    <CarouselContent className="-ml-4">
                        {[0, 4].map((startIdx) => (
                            <CarouselItem key={`slide-${startIdx}`} className="pl-4 basis-full">
                                <div className="grid grid-cols-4 gap-6">
                                    {bestSellingProducts.slice(startIdx, startIdx + 4).map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-background shadow-md border-border" />
                    <CarouselNext className="right-0 bg-background shadow-md border-border" />
                </Carousel>
            </div>

            {/* Tablet */}
            <div className="hidden sm:block lg:hidden mb-16">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                    <CarouselContent className="-ml-4">
                        {[0, 2, 4, 6].map((startIdx) => (
                            <CarouselItem key={`slide-${startIdx}`} className="pl-4 basis-full">
                                <div className="grid grid-cols-2 gap-4">
                                    {bestSellingProducts.slice(startIdx, startIdx + 2).map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-background shadow-md border-border" />
                    <CarouselNext className="right-0 bg-background shadow-md border-border" />
                </Carousel>
            </div>

            {/* Mobile */}
            <div className="sm:hidden mb-16">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {bestSellingProducts.map((product) => (
                            <CarouselItem key={product.id}>
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-background shadow-md border-border" />
                    <CarouselNext className="right-0 bg-background shadow-md border-border" />
                </Carousel>
            </div>



        </div>
    );
};

export default BestSellingPage;
