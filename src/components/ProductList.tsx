import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductListProps {
    category?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category = 'all' }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('🔍 Intentando cargar productos...');
                console.log('📍 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
                
                let query = supabase.from('products').select('*');
                
                if (category !== 'all') {
                    query = query.eq('category', category);
                }
                
                const { data, error } = await query;
                
                console.log('📦 Respuesta de Supabase:', { data, error });
                
                if (error) {
                    console.error('❌ Error de Supabase:', error);
                    throw error;
                }
                
                const productsWithQuantity = (data || []).map(p => ({
                    ...p,
                    quantity: p.quantity || 0
                }));
                
                console.log('✅ Productos cargados:', productsWithQuantity);
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

    if (loading) return (
        <div className="text-center p-8">
            <div className="text-xl">⏳ Cargando productos...</div>
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
            {products.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500 text-xl">
                    📭 No hay productos en esta categoría
                </p>
            ) : (
                products.map(product => (
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