"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarIcon, ShoppingCart, Heart } from 'lucide-react'
import useProductStore from '@/components/client/hooks/use-product-store'
import type { Product } from '@/components/client/hooks/use-product-store'

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

export default function ProductDetails() {
    const params = useParams()
    const products = useProductStore((state) => state.products)
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const foundProduct = products.find(p => p.id === params.id)
        if (foundProduct) {
            setProduct(foundProduct)
        }
    }, [params.id, products])

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Product not found</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                        fill
                        src={product.image}
                        alt={product.title}
                        className="object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <RatingStars rating={product.rating?.rate || 0} />
                                <span className="text-sm text-muted-foreground ml-2">
                                    ({product.rating?.count || 0} reviews)
                                </span>
                            </div>
                            <Badge variant="outline">{product.category}</Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" className="flex-1">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t pt-6 space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Shipping Information</h3>
                            <p className="text-muted-foreground">
                                Free shipping on orders over $150. Estimated delivery time: 3-5 business days.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Return Policy</h3>
                            <p className="text-muted-foreground">
                                30-day return policy. Items must be unused and in original packaging.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 