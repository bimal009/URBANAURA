"use client";

import { useCartStore } from "@/lib/store/cart";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CartCount() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        // Check for authentication on mount and when localStorage changes
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };

        // Check immediately
        checkAuth();

        // Set up event listener for storage changes (in case user logs in/out in another tab)
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleClick = () => {
        if (isAuthenticated) {
            router.push("/cart");
        } else {
            router.push("/login");
        }
    };

    return (
        <div
            onClick={handleClick}
            className="relative cursor-pointer"
        >
            <ShoppingCart size={20} className="text-white" />
            {totalItems > 0 && (
                <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                >
                    {totalItems}
                </Badge>
            )}
        </div>
    );
}