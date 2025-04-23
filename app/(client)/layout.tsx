"use client"

import Navbar from "@/components/client/Navbar";
import { Toaster } from "@/components/ui/sonner"

import { QueryProvider } from "@/providers/queryProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;

}>) {
    return (
        <html lang="en">
            <body>
                <Toaster />
                <QueryProvider>
                    <Navbar />
                    {children}
                </QueryProvider>

            </body>
        </html>
    );
}
