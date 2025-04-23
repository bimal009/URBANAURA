
import Hero from '@/components/client/Hero'
import React from 'react'
import BestSellingPage from '@/components/client/BestSelling'
import Footer from '@/components/client/Footer'
import CategorySection from '@/components/client/Catagories'
import FeaturesSection from '@/components/client/Features'
import TestimonialsSection from '@/components/client/Testimonials'




const page = () => {

    return (
        <>


            <Hero />
            <BestSellingPage />
            <CategorySection />
            <FeaturesSection />
            <TestimonialsSection />
            <Footer />
        </>
    )
}

export default page