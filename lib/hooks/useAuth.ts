"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectAuthenticated = false, redirectPath = '/') {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);

      // Handle redirects based on auth state
      if (redirectAuthenticated && token) {
        router.replace(redirectPath);
      } else if (!redirectAuthenticated && !token) {
        router.replace('/login');
      }
    };

    checkAuth();

    // Listen for storage events (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [redirectAuthenticated, redirectPath, router]);

  return { isAuthenticated, isLoading };
}

