import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

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

const storage: PersistStorage<CartStore> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null
    const str = localStorage.getItem(name)
    if (!str) return null
    try {
      return JSON.parse(str)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(name)
  }
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
        if (quantity > 0) {
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        } else {
          set({
            items: currentItems.filter((item) => item.id !== id),
          })
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage,
    }
  )
)
