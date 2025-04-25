import Products from '@/components/client/Products'
import ProductLoader from '@/lib/store/ProductLoader'
import React from 'react'

const page = () => {
    return (
        <div className='container mt-5 mx-auto'>
            <ProductLoader />
            <Products />
        </div>
    )
}

export default page
