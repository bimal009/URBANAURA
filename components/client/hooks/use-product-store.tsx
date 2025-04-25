import { create } from "zustand"

export type Product = {
    id: number
    title: string
    price: number
    description: string
    category: {
        id: number
        name: string
    }
    images: string[]
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
