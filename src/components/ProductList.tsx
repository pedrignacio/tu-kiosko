import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductListProps {
    category?: string;
    searchTerm?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category = 'all', searchTerm = '' }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let query = supabase.from('products').select('*');
                
                if (category !== 'all') {
                    query = query.eq('category', category);
                }
                
                const { data, error } = await query;
                
                if (error) {
                    console.error('❌ Error de Supabase:', error);
                    throw error;
                }
                
                const productsWithQuantity = (data || []).map(p => ({
                    ...p,
                    quantity: p.quantity || 0
                }));
                
                setProducts(productsWithQuantity);
            } catch (error: any) {
                console.error('❌ Error completo:', error);
                setError(`Error: ${error.message || 'No se pudieron cargar los productos'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    // Filtra por búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
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
    
    if (error) return (
        <div className="text-center p-8">
            <div className="text-red-500 text-xl mb-4">❌ {error}</div>
            <div className="text-sm text-gray-600">
                <p>Verifica:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Las variables de entorno están correctas</li>
                    <li>Las tablas existen en Supabase</li>
                    <li>Las políticas RLS están configuradas</li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {filteredProducts.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500 text-2xl mb-2">📭 No se encontraron productos</p>
                    {searchTerm && (
                        <p className="text-gray-400">
                            No hay resultados para "<strong>{searchTerm}</strong>"
                        </p>
                    )}
                </div>
            ) : (
                filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addItem}
                    />
                ))
            )}
        </div>
    );
};

export default ProductList;