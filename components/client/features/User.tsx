"use client";

import { User2, LogOut, Settings, User as UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/lib/store/user'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fetchUserProfile, logoutUser } from '@/utils/api'

const User = () => {

    const { user, setUser, logout } = useUserStore()
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token")
            setIsAuthenticated(!!token)
        }

        checkAuth()
        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchUserProfile()
                setUser(response)
            } catch (error) {
                console.error('Error fetching user:', error)
                setIsAuthenticated(false)
                localStorage.removeItem("token")
            }
        }

        if (isAuthenticated && !user) {
            fetchUser()
        }
    }, [isAuthenticated, user, setUser])

    const handleLogout = async () => {
        try {
            logoutUser()

            localStorage.removeItem("token");


                setIsAuthenticated(false);

                if (logout) {
                    logout();
                } else {
                    setUser(null);
                }

                window.location.href = '/login';

        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-white hover:text-white/80 transition-colors flex items-center justify-center w-8 h-8'>
                    {user?.image ? (
                        <div className="relative w-6 h-6">
                            <Image
                                src={user.image}
                                alt={user.name || 'User'}
                                width={24}
                                height={24}
                                className="rounded-full"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <User2 size={20} />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default User