"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import useProductStore from '../../lib/store/ProductStore'
import type { Product } from '../../lib/store/ProductStore'
import Cards from './card'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function Products() {
    const router = useRouter()
    const products = useProductStore((state) => state.products)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['all'])
    const [isLoading, setIsLoading] = useState(true)
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false)
        }
    }, [products])

    const uniqueCategories = ['all', ...new Set(products.map((product: Product) => product.category))]

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => {
            if (category === 'all') return ['all']

            let newSelection = prev.includes('all') ? prev.filter(cat => cat !== 'all') : [...prev]

            if (newSelection.includes(category)) {
                newSelection = newSelection.filter(cat => cat !== category)
                return newSelection.length === 0 ? ['all'] : newSelection
            } else {
                return [...newSelection, category]
            }
        })
    }

    const filteredProducts = products.filter((product: Product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.includes('all') ||
            selectedCategories.includes(product.category)
        return matchesSearch && matchesCategory
    })

    const handleProductClick = (productId: string) => {
        router.push(`/products/${productId}`)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    // Category display component that changes based on screen size
    const CategoryFilters = () => (
        <div className="bg-muted p-6 rounded-lg sticky top-4">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-3">
                {uniqueCategories.map((category, index) => (
                    <div key={`category-${category}-${index}`} className="flex items-center space-x-2">
                        <Checkbox
                            id={`category-${category}-${index}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label
                            htmlFor={`category-${category}-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {category === 'all' ? 'All Categories' : category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our curated collection of modern, urban-inspired home decor and furniture.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-lg mx-auto mb-12">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Dropdown for Categories */}
                <div className="md:hidden w-full mb-6">
                    <Collapsible
                        open={isCategoriesOpen}
                        onOpenChange={setIsCategoriesOpen}
                        className="w-full"
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-between"
                            >
                                <span>Filter by Categories</span>
                                {isCategoriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                            <div className="border rounded-lg">
                                <CategoryFilters />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden md:block w-64 flex-shrink-0">
                    <CategoryFilters />
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => {
                                const cardProduct = {
                                    id: product.id,
                                    name: product.title,
                                    price: product.price,
                                    originalPrice: product.price,
                                    rating: product.rating?.rate || 0,
                                    reviewCount: product.rating?.count || 0,
                                    image: product.image,
                                    category: product.category,
                                    isNew: false,
                                    discount: 0,
                                    hideHeart: true
                                }
                                return (
                                    <Cards
                                        key={`product-${product.id}`}
                                        product={cardProduct}
                                        onClick={() => handleProductClick(product.id)}
                                    />
                                )
                            })
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Collections */}
            <div className="mt-16 bg-muted rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Explore Our Featured Collections</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Curated sets designed to transform your space with cohesive style and functionality.
                </p>
                <Button size="lg">View Collections</Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Quality Materials</h3>
                    <p className="text-muted-foreground">
                        All our products are crafted from premium, sustainable materials selected for both beauty and durability.
                    </p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
                    <p className="text-muted-foreground">
                        Enjoy free shipping on all orders over $150. Quick and reliable delivery to your doorstep.
                    </p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">30-Day Returns</h3>
                    <p className="text-muted-foreground">
                        Not completely satisfied? Return your purchase within 30 days for a full refund or exchange.
                    </p>
                </Card>
            </div>
        </div>
    )
}