"use client"
import { useEffect } from "react"
import useGetProducts from "../../components/client/api/use-get-products"
import useProductStore from "./ProductStore"

const ProductLoader = () => {
    const { data, error } = useGetProducts()
    const setProducts = useProductStore((state) => state.setProducts)

    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data, setProducts])

    if (error) {
        console.error("Failed to fetch products:", error)
    }

    return null
}

export default ProductLoader
