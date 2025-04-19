"use client";

import React from 'react';
import { Truck, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Truck className="h-6 w-6" />,
        title: "Fast Shipping",
        description: "Free shipping on all orders over $100"
    },
    {
        icon: <RotateCcw className="h-6 w-6" />,
        title: "Easy Returns",
        description: "30-day hassle-free return policy"
    },
    {
        icon: <CreditCard className="h-6 w-6" />,
        title: "Secure Payment",
        description: "Multiple secure payment options"
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Quality Guarantee",
        description: "Products that last, backed by our guarantee"
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-12 bg-accent">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 rounded-lg"
                        >
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4 text-primary-foreground">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-accent-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;