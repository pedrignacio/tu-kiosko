import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useCart } from '../hooks/useCart';

interface ProductListProps {
    category: string;
    searchTerm: string;
    sortBy?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category, searchTerm, sortBy = 'default' }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) throw error;

                // Filtrar por categoría
                let filtered = data || [];
                if (category !== 'all') {
                    filtered = filtered.filter(p => p.category === category);
                }

                // Filtrar por búsqueda
                if (searchTerm.trim()) {
                    filtered = filtered.filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Ordenar según selección
                switch (sortBy) {
                    case 'price-asc':
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case 'name-asc':
                        filtered.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'name-desc':
                        filtered.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    case 'newest':
                        filtered.sort((a, b) => {
                            const dateA = new Date(a.created_at || 0).getTime();
                            const dateB = new Date(b.created_at || 0).getTime();
                            return dateB - dateA;
                        });
                        break;
                    default:
                        // Orden predeterminado (por ID o como vienen de la DB)
                        break;
                }

                setProducts(filtered);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, searchTerm, sortBy]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse bg-white dark:bg-gray-800">
                        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">🔍 No se encontraron productos</p>
                <p className="text-gray-400 dark:text-gray-500">Intenta con otra búsqueda o categoría</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addItem}
                />
            ))}
        </div>
    );
};

export default ProductList;