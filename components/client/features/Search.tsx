"use client"
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {

    return (
        <div className="search ">

            <div className="input  flex border bg-accent rounded-2xl items-center py-1 transition-all duration-200 px-2">
                <SearchIcon size={20} className="cursor-pointer" />
                <input
                    className="bg-transparent outline-none px-3"
                    type="text"
                    placeholder="Search"
                    autoFocus
                />
            </div>

        </div>
    )
}

export default Search
