import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<Product, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        let updatedItems: CartItem[];
        
        if (existingItem) {
          updatedItems = state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...state.items, { ...product, quantity: 1 }];
        }
        
        return {
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        };
      }),

      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          // Si la cantidad es 0 o negativa, eliminar el item
          const updatedItems = state.items.filter(item => item.id !== id);
          return {
            items: updatedItems,
            total: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        }

        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        
        return {
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        };
      }),
      
      removeItem: (id) => set((state) => {
        const updatedItems = state.items.filter(item => item.id !== id);
        return {
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        };
      }),
      
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: 'cart-storage', // Nombre en localStorage
    }
  )
);