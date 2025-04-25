"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, StarIcon } from "lucide-react";
import Image from "next/image";
import {
    Card as ShadcnCard,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";

// Product type definition
type Product = {
    id: string
    name: string
    price: number
    originalPrice: number
    rating: number
    reviewCount: number
    image: string
    category: string
    isNew: boolean
    discount: number
    hideHeart: boolean
}

type CardProps = {
    product?: Product;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <StarIcon
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(rating)
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

const Cards: React.FC<CardProps> = ({ product, children, className, onClick }) => {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (product) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
        }
    };

    if (product) {
        return (
            <ShadcnCard
                className={`rounded-lg overflow-hidden border-border h-full flex flex-col ${className || ''} cursor-pointer`}
                onClick={onClick}
            >
                <div className="relative aspect-square overflow-hidden group">
                    <Image
                        fill
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-white text-xs py-0">
                            {product.discount}% OFF
                        </Badge>
                    )}
                    {product.isNew && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs py-0">
                            NEW
                        </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Button
                                size="icon"
                                className="rounded-full h-8 w-8 shadow-md bg-primary hover:bg-primary/90 p-0"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>

                <CardContent className="p-3 space-y-1 flex-grow">
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs font-normal text-muted-foreground px-2 py-0">
                            {product.category}
                        </Badge>
                        <div className="flex items-center">
                            <RatingStars rating={product.rating} />
                            <span className="text-xs ml-1 text-muted-foreground">({product.reviewCount})</span>
                        </div>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors">
                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="flex items-center">
                        <span className="text-primary font-semibold text-sm mr-2">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-muted-foreground text-xs line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-3 pt-0">
                    <Button
                        onClick={handleAddToCart}
                        size="sm"
                        className="w-full rounded-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        Add to Cart
                    </Button>
                </CardFooter>
            </ShadcnCard>
        );
    }

    return (
        <ShadcnCard className={className || ''}>
            {children}
        </ShadcnCard>
    );
};

export default Cards;
