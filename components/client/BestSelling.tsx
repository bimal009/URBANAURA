"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// Import ShadCN components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Cards from "./card";
import useProductStore from "../../lib/store/ProductStore";
import ProductLoader from "../../lib/store/ProductLoader";

const BestSellingPage: React.FC = () => {
    const router = useRouter();
    const products = useProductStore((state) => state.products);

    // Filter for best-selling products (based on rating count)
    const bestSellingProducts = useMemo(() => {
        // Sort products by rating count in descending order
        return [...products]
            .sort((a, b) => b.rating.count - a.rating.count)
            // Take top 5 products or all if less than 5
            .slice(0, 5)
            .map(product => ({
                id: product.id,
                name: product.title,
                price: product.price,
                // Estimate an original price for discount calculation
                originalPrice: Math.round(product.price * 1.2 * 100) / 100,
                rating: product.rating.rate,
                reviewCount: product.rating.count,
                image: product.image,
                category: product.category,
                isNew: product.rating.count > 300, // Example condition for "new" badge
                discount: 20, // Default discount percentage
            }));
    }, [products]);

    const handleCardClick = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    const renderProductCard = (product: any) => {
        return (
            <div
                key={`best-selling-${product.id}`}
                onClick={() => handleCardClick(product.id)}
                className="cursor-pointer"
            >
                <Cards
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
            </div>
        );
    };

    // Show loading state when products are being fetched
    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ProductLoader />
                <div className="flex justify-center items-center h-40">
                    <p className="text-muted-foreground">Loading best selling products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Make sure ProductLoader is included to fetch data */}
            <ProductLoader />

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