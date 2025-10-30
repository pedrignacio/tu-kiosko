import { create } from 'zustand';
import { Product } from '../types';

interface CartState {
  items: Product[];
  addItem: (product: Omit<Product, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  total: 0,
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      };
    }
    
    const newItems = [...state.items, { ...product, quantity: 1 }];
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };
  }),
  
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter(item => item.id !== id);
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };
  }),
  
  clearCart: () => set({ items: [], total: 0 }),
}));