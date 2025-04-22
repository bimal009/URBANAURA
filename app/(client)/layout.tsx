"use client"

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
                    {children}
                </QueryProvider>

            </body>
        </html>
    );
}
