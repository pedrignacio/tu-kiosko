import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../services/supabase';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    // Imágenes de ejemplo
    const productImages = [
        product?.imageUrl || 'https://via.placeholder.com/600x400?text=Producto',
        'https://via.placeholder.com/600x400?text=Vista+2',
        'https://via.placeholder.com/600x400?text=Vista+3',
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProduct(data);

                // Cargar productos relacionados
                if (data) {
                    const { data: related } = await supabase
                        .from('products')
                        .select('*')
                        .eq('category', data.category)
                        .neq('id', id)
                        .limit(4);
                    
                    if (related) setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Error al cargar producto:', error);
                toast.error('No se pudo cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }

        toast.success(
            () => (
                <div className="flex items-center gap-4">
                    {/* Imagen del producto */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {product.imageUrl ? (
                            <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                📦
                            </div>
                        )}
                    </div>
                    
                    {/* Info del producto */}
                    <div className="flex-1">
                        <p className="font-bold text-white mb-1">
                            {quantity}x {product.name}
                        </p>
                        <p className="text-sm text-green-100">✓ Agregado al carrito</p>
                        <p className="text-xs text-green-200 mt-1">
                            Total: ${(product.price * quantity).toLocaleString('es-CL')}
                        </p>
                    </div>
                </div>
            ),
            {
                duration: 3000,
                style: {
                    background: '#10b981',
                    color: '#fff',
                    padding: '12px',
                    minWidth: '300px',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#10b981',
                },
            }
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">Producto no encontrado</h1>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Breadcrumbs */}
            <Breadcrumbs 
                items={[
                    { label: '🏠 Inicio', path: '/' },
                    { label: product.category, path: '/' },
                    { label: product.name }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Galería de imágenes */}
                <div className="space-y-4 animate-slideInLeft">
                    {/* Imagen principal */}
                    <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-xl">
                        <img 
                            src={productImages[selectedImage]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Miniaturas */}
                    <div className="flex gap-4">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition ${
                                    selectedImage === index 
                                        ? 'border-blue-500 dark:border-blue-400 scale-105' 
                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                }`}
                            >
                                <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Información del producto */}
                <div className="space-y-6 animate-slideInRight">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 dark:text-white">{product.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{product.category}</p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                            ${product.price.toLocaleString('es-CL')}
                        </p>
                    </div>

                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {product.description || 'Este producto no tiene descripción disponible.'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Stock: {' '}
                            {product.quantity > 0 ? (
                                <span className="text-green-600 dark:text-green-400">✓ Disponible ({product.quantity} unidades)</span>
                            ) : (
                                <span className="text-red-600 dark:text-red-400">✗ Sin stock</span>
                            )}
                        </p>

                        {/* Selector de cantidad */}
                        {product.quantity > 0 && (
                            <div>
                                <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Cantidad:</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold w-12 text-center dark:text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                        className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Botón agregar al carrito */}
                        <button 
                            onClick={handleAddToCart}
                            disabled={product.quantity === 0}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                                product.quantity > 0
                                    ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl transform hover:scale-105'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {product.quantity > 0 ? '🛒 Agregar al carrito' : 'Sin stock'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Productos relacionados */}
            {relatedProducts.length > 0 && (
                <div className="mt-16 animate-fadeIn">
                    <h2 className="text-3xl font-bold mb-6 dark:text-white">
                        🔗 Productos relacionados
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p} 
                                onAddToCart={addItem}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;