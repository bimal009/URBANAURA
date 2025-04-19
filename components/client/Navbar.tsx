import Link from 'next/link';
import React from 'react'
import Search from './features/Search';
import User from './features/User';
import Cart from './features/cart';

const Navlinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/products",
        label: "Products"
    },
    {
        href: "/categories",
        label: "Categories"
    },
    {
        href: "/about",
        label: "About"
    },
    {
        href: "/contact",
        label: "Contact"
    },
];




const Navbar = () => {
    return (
        <div className='px-46 py-3 mx-auto flex justify-between items-center bg-primary'>

            <div className="logo font-medium text-xl text-secondary ">
                <Link href="/home">
                    URBANAURA
                </Link>
            </div>
            <div className="links flex gap-7">
                {Navlinks.map((items, index) => (
                    <div key={index} className='text-white/90 hover:text-white'>
                        <Link href={items.href}> {items.label}</Link>
                    </div>
                ))}
            </div>
            <div className="icons flex gap-3 justify-center items-center ">
                <Search />
                <User />
                <Cart />

            </div>
        </div>
    )
}

export default Navbar