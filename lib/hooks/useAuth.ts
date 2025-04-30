"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom authentication hook to handle auth state and redirects
 * @param redirectIfAuthenticated If true, redirect authenticated users away (for login/signup pages)
 * @param redirectPath Path to redirect to based on authentication state
 * @returns Auth state information
 */
export function useAuth(redirectIfAuthenticated = false, redirectPath = '/login') {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check both localStorage and cookies for auth state
      const token = localStorage.getItem('token');
      const isAuth = !!token;
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      // Handle redirects based on auth state
      if (redirectIfAuthenticated && isAuth) {
        // If user is authenticated and trying to access login/signup, redirect away
        router.push(redirectPath);
      } else if (!redirectIfAuthenticated && !isAuth && redirectPath !== '/login') {
        // If user is NOT authenticated and trying to access protected route, redirect to login
        // Add the current path as a redirect parameter
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    };

    // Check auth state immediately on mount
    checkAuth();

    // Listen for storage events (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [redirectIfAuthenticated, redirectPath, router]);

  return { isAuthenticated, isLoading };
}