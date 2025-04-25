import Products from '@/components/client/Products'
import ProductLoader from '@/components/client/hooks/use-get-products'
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
