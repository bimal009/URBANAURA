"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function CartPage() {
    // Protected route - this ensures user is logged in
    const { isAuthenticated, isLoading } = useAuth();
    const { items, updateQuantity, removeItem, clearCart } = useCartStore();

    // Don't show anything while checking auth status
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <Link href="/products">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-grow">
                                <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
                                    {item.name}
                                </Link>
                                <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-card p-6 rounded-lg border">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mb-2">Proceed to Checkout</Button>
                        <Button variant="outline" className="w-full" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}