import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)
        
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
          })
        }
      },
      removeItem: (id) => {
        const currentItems = get().items
        set({
          items: currentItems.filter((item) => item.id !== id),
        })
      },
      updateQuantity: (id, quantity) => {
        const currentItems = get().items
        set({
          items: currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
)
