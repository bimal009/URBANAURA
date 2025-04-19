"use client";
import { Search as SearchIcon, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const Search: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to collapse search
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    // Focus input when expanded
    useEffect(() => {
        if (isExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isExpanded]);

    const expandSearch = (): void => {
        setIsExpanded(true);
    };

    const clearSearch = (): void => {
        setSearchQuery('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Handle search submission here
        console.log('Searching for:', searchQuery);
        // You could redirect to search results page or trigger a search function
    };

    return (
        <div ref={searchContainerRef} className="search relative">
            {isExpanded ? (
                <form onSubmit={handleSubmit} className="relative">
                    <div className="input flex items-center bg-card rounded-full border border-input shadow-sm transition-all duration-300 py-2 px-3 sm:w-64 w-48">
                        <SearchIcon size={18} className="text-muted-foreground flex-shrink-0" />

                        <input
                            ref={searchInputRef}
                            className="bg-transparent outline-none ml-2 w-full text-sm text-foreground placeholder-muted-foreground"
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <button
                    onClick={expandSearch}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary-foreground transition-all duration-200"
                    aria-label="Open search"
                >
                    <SearchIcon size={20} className="cursor-pointer" />
                </button>
            )}
        </div>
    );
};

export default Search;