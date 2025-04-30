"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarIcon, ShoppingCart, Heart, Truck, RefreshCcw } from 'lucide-react'
import useProductStore from '@/lib/store/ProductStore'
import type { Product } from '@/lib/store/ProductStore'
import { Separator } from '@/components/ui/separator'

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
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
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading state for better UX
        setIsLoading(true)

        setTimeout(() => {
            const foundProduct = products.find(p => p.id === params.id)
            if (foundProduct) {
                setProduct(foundProduct)
            }
            setIsLoading(false)
        }, 300)
    }, [params.id, products])

    const incrementQuantity = () => setQuantity(prev => prev + 1)
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 mt-10">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse space-y-8 w-full max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-gray-200 rounded-lg aspect-square"></div>
                            <div className="space-y-6">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 mt-10">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Product not found</h1>
                    <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
                    <Button asChild>
                        <a href="/products">Return to Products</a>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border shadow-sm">
                    <Image
                        fill
                        src={product.image}
                        alt={product.title}
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge className="mb-2" variant="outline">{product.category}</Badge>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center gap-2">
                            <RatingStars rating={product.rating?.rate || 0} />
                            <span className="text-sm text-muted-foreground">
                                ({product.rating?.count || 0} reviews)
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <p className="text-3xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="prose prose-sm text-muted-foreground">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-md rounded-r-none"
                                onClick={decrementQuantity}
                            >
                                -
                            </Button>
                            <div className="h-8 w-12 flex items-center justify-center border-y">
                                {quantity}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-md rounded-l-none"
                                onClick={incrementQuantity}
                            >
                                +
                            </Button>
                        </div>
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
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-2">
                            <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-sm">Free Shipping</h3>
                                <p className="text-xs text-muted-foreground">
                                    On orders over $150. Estimated delivery: 3-5 business days.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-2">
                            <RefreshCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-sm">30-Day Returns</h3>
                                <p className="text-xs text-muted-foreground">
                                    Items must be unused and in original packaging.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}