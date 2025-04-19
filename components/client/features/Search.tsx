import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
    return (
        <div className="search bg-background">
            <div className="input border rounded-r-2x  flex  py-1 px-2">

                <SearchIcon />
                <input className='bg-transparent outline-none focus:outline-none px-3' type="text" placeholder='Search ' />
            </div>
        </div>
    )
}

export default Search