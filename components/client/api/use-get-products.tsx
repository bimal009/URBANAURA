// use-get-products.ts
import { useQuery } from "@tanstack/react-query"
import type { Product } from "../hooks/use-product-store"

export type GetProductsResponse = {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}[]

export type GetProductsErrorResponse = {
    error: string
}

const useGetProducts = () => {
    return useQuery<Product[], GetProductsErrorResponse>({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                if (!response.ok) {
                    const errorBody = await response.json()
                    throw { error: errorBody?.message || "Failed to fetch products" } as GetProductsErrorResponse
                }

                const data = await response.json()
                // Transform the data to match our store's Product type
                return data.map((product: GetProductsResponse[0]): Product => ({
                    id: product.id.toString(), // Ensure id is a string
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category, // Keep as string instead of transforming to object
                    image: product.image,
                    rating: product.rating
                }))
            } catch (error) {
                throw {
                    error: (error as GetProductsErrorResponse)?.error || "Something went wrong",
                } as GetProductsErrorResponse
            }
        }
    })
}

export default useGetProducts