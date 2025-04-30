"use client"

import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/providers/queryProvider";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryProvider>
            <Toaster />
            {children}
        </QueryProvider>
    );
} 