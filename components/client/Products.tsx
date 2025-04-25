"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import useProductStore from './hooks/use-product-store'
import type { Product } from './hooks/use-product-store'
import Cards from './card'

export default function Products() {
    const products = useProductStore((state) => state.products)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['all'])
    console.log(products)

    // Get unique categories for filter checkboxes
    const uniqueCategories = ['all', ...new Set(products.map((product: Product) => product.category.name))]

    // Handle checkbox changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => {
            // If selecting "all", clear other selections
            if (category === 'all') {
                return ['all']
            }

            // If current selection includes "all" and selecting another category, remove "all"
            let newSelection = prev.includes('all') && category !== 'all'
                ? prev.filter(cat => cat !== 'all')
                : [...prev]

            // Toggle the selected category
            if (newSelection.includes(category)) {
                newSelection = newSelection.filter(cat => cat !== category)
                // If nothing selected, default to "all"
                if (newSelection.length === 0) return ['all']
                return newSelection
            } else {
                return [...newSelection, category]
            }
        })
    }

    // Filter products based on search term and selected categories
    const filteredProducts = products.filter((product: Product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategories.includes('all') ||
            selectedCategories.includes(product.category.name)

        return matchesSearch && matchesCategory
    })

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our curated collection of modern, urban-inspired home decor and furniture.
                </p>
            </div>

            {/* Centered Search */}
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
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-muted p-6 rounded-lg sticky top-4">
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                        <div className="space-y-3">
                            {uniqueCategories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category}`}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={() => handleCategoryChange(category)}
                                    />
                                    <label
                                        htmlFor={`category-${category}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Cards
                                    key={product.id}
                                    product={{
                                        id: product.id,
                                        name: product.title,
                                        price: product.price,
                                        originalPrice: product.price,
                                        rating: 4.5,
                                        reviewCount: 120,
                                        image: product.images[0],
                                        category: product.category.name,
                                        isNew: false,
                                        discount: 0
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Collections Banner */}
            <div className="mt-16 bg-muted rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Explore Our Featured Collections</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Curated sets designed to transform your space with cohesive style and functionality.
                </p>
                <Button size="lg">
                    View Collections
                </Button>
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <Cards className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Quality Materials</h3>
                    <p className="text-muted-foreground">
                        All our products are crafted from premium, sustainable materials selected for both beauty and durability.
                    </p>
                </Cards>

                <Cards className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
                    <p className="text-muted-foreground">
                        Enjoy free shipping on all orders over $150. Quick and reliable delivery to your doorstep.
                    </p>
                </Cards>

                <Cards className="p-6">
                    <h3 className="text-xl font-semibold mb-4">30-Day Returns</h3>
                    <p className="text-muted-foreground">
                        Not completely satisfied? Return your purchase within 30 days for a full refund or exchange.
                    </p>
                </Cards>
            </div>
        </div>
    )
}