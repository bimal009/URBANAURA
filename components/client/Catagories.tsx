'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

const CategorySection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products/category/women's clothing");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Transform the data to match our Product interface
                const transformedData: Product[] = data.map((item: any) => ({
                    id: String(item.id),
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    category: item.category
                }));
                setProducts(transformedData);
            } catch (error) {
                console.error('There was an error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="py-16 bg-background select-none">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Shop By Category</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collections fetched live from the store API
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={`category-${product.id}`} className="group relative overflow-hidden rounded-xl">
                            {/* Product Image */}
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <Image
                                    fill
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
                                <p className="text-white/80 mb-4 text-sm line-clamp-2">{product.description}</p>
                                <Link href={`/products/${product.id}`}>
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
