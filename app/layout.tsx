import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/queryProvider";

export const metadata: Metadata = {
  title: "Urbanaura",
  description: "Created by Bimal Pandey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
