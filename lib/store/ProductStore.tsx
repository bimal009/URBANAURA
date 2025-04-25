// use-product-store.ts
import { create } from "zustand"

export type Product = {
    id: string
    title: string
    price: number
    description: string
    category: string  // Changed from object to string
    image: string
    rating: {
        rate: number
        count: number
    }
}

interface ProductState {
    products: Product[]
    setProducts: (products: Product[]) => void
}

const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
}))

export default useProductStore