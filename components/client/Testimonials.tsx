"use client";

import React from 'react';
import { StarIcon, Quote } from 'lucide-react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
    id: number;
    name: string;
    title: string;
    rating: number;
    text: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Alex Johnson",
        title: "Fashion Enthusiast",
        rating: 5,
        text: "The quality of UrbanAura's clothing is exceptional. I've been a customer for over a year now, and every piece I've purchased has become a staple in my wardrobe. The urban essentials collection is perfect for my daily life in the city."
    },
    {
        id: 2,
        name: "Maya Wilson",
        title: "Professional Stylist",
        rating: 5,
        text: "As a professional stylist, I recommend UrbanAura to all my clients. Their pieces are versatile, well-made, and have that perfect balance of trendy and timeless. The attention to detail sets them apart from other brands."
    },
    {
        id: 3,
        name: "David Chen",
        title: "Loyal Customer",
        rating: 4,
        text: "Customer service is top-notch at UrbanAura. I had an issue with sizing, and they made the exchange process incredibly smooth. The clothes are stylish and comfortable - exactly what I need for my busy lifestyle."
    },
    {
        id: 4,
        name: "Sarah Rodriguez",
        title: "Fashion Blogger",
        rating: 5,
        text: "I feature UrbanAura products regularly on my blog because they photograph beautifully and my audience loves them. The modern designs with classic elements create pieces that stand the test of time."
    }
];

interface StarsProps {
    rating: number;
}

const Stars: React.FC<StarsProps> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <StarIcon
                    key={i}
                    size={16}
                    className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                />
            ))}
        </div>
    );
};

interface AvatarProps {
    name: string;
}

const AvatarWithInitials: React.FC<AvatarProps> = ({ name }) => {
    const initials = name
        .split(' ')
        .map(part => part[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
    const colorIndex = name.charCodeAt(0) % colors.length;

    return (
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium ${colors[colorIndex]}`}>
            {initials}
        </div>
    );
};

const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-16 bg-background select-none">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hear from our community of urban fashion enthusiasts who trust UrbanAura for their style needs
                    </p>
                </div>

                <div className="relative">
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="bg-card h-full shadow-sm border border-border rounded-xl p-6 flex flex-col">
                                        <div className="mb-4">
                                            <Quote size={24} className="text-primary opacity-40" />
                                        </div>
                                        <div className="mb-4 flex-grow">
                                            <p className="text-card-foreground italic">{testimonial.text}</p>
                                        </div>
                                        <div className="mt-auto pt-4 flex items-center">
                                            <AvatarWithInitials name={testimonial.name} />
                                            <div className="ml-4">
                                                <h4 className="font-medium">{testimonial.name}</h4>
                                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                                <div className="mt-1">
                                                    <Stars rating={testimonial.rating} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="left-0 bg-background shadow-md border-border" />
                            <CarouselNext className="right-0 bg-background shadow-md border-border" />
                        </div>
                    </Carousel>
                </div>

                <div className="flex justify-center mt-6 md:hidden">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 mx-1 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/30'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
