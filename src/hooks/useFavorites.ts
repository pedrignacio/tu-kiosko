import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { Product } from '../types';

interface FavoritesState {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

export const useFavorites = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            
            addFavorite: (product) => {
                const { favorites } = get();
                
                if (favorites.some(p => p.id === product.id)) {
                    toast.error('Este producto ya está en favoritos');
                    return;
                }
                
                set({ favorites: [...favorites, product] });
                toast.success(`❤️ ${product.name} agregado a favoritos`, {
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                    },
                });
            },
            
            removeFavorite: (productId) => {
                const { favorites } = get();
                const product = favorites.find(p => p.id === productId);
                
                set({ favorites: favorites.filter(p => p.id !== productId) });
                
                if (product) {
                    toast.success(`💔 ${product.name} eliminado de favoritos`, {
                        style: {
                            background: '#6b7280',
                            color: '#fff',
                        },
                    });
                }
            },
            
            isFavorite: (productId) => {
                return get().favorites.some(p => p.id === productId);
            },
            
            clearFavorites: () => {
                set({ favorites: [] });
                toast.success('Favoritos limpiados');
            },
        }),
        {
            name: 'favorites-storage',
        }
    )
);