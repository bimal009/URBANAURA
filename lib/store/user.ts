import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  name: string
  email: string
  image?: string
}

type UserStore = {
  id: string | null
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id:  null,
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
) 