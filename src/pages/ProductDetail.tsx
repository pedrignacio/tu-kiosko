import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../services/supabase';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>(0);

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
                <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                        <p className="font-bold">{quantity}x {product.name}</p>
                        <p className="text-sm text-gray-300">Agregado al carrito</p>
                    </div>
                </div>
            ),
            {
                style: {
                    background: '#10b981',
                    color: '#fff',
                },
            }
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
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
            {product && (
                <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 animate-fadeIn">
                    <button onClick={() => navigate('/')} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Inicio
                    </button>
                    <span className="mx-2">›</span>
                    <span className="text-gray-400">{product.category}</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-800 dark:text-white font-semibold">{product.name}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="animate-slideInLeft">
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                        <img 
                            src={productImages[selectedImage]} 
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                                    selectedImage === index 
                                        ? 'border-blue-500 scale-105' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <img 
                                    src={img} 
                                    alt={`Vista ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="animate-slideInRight">
                    <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        {product.category}
                    </div>

                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    <div className="mb-6">
                        <p className="text-4xl font-bold text-blue-600">
                            ${product.price.toLocaleString('es-CL')}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            IVA incluido
                        </p>
                    </div>

                    <div className="mb-6">
                        {product.quantity > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-semibold text-lg">✓ Disponible</span>
                                <span className="text-gray-600">({product.quantity} unidades)</span>
                            </div>
                        ) : (
                            <span className="text-red-600 font-semibold text-lg">✗ Sin stock</span>
                        )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="font-bold text-lg mb-3">📋 Descripción</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description || 'Este producto de alta calidad es perfecto para tu negocio. Fabricado con materiales de primera y diseñado para durar.'}
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                        <h3 className="font-bold text-lg mb-3">✨ Características</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-600">•</span>
                                Alta calidad
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-600">•</span>
                                Entrega rápida
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-600">•</span>
                                Garantía incluida
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-600">•</span>
                                Envío gratis sobre $10.000
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Cantidad:</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-xl transition"
                            >
                                −
                            </button>
                            <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                disabled={quantity >= product.quantity}
                                className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleAddToCart}
                            disabled={product.quantity === 0}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
                                product.quantity > 0
                                    ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {product.quantity > 0 ? '🛒 Agregar al carrito' : 'Sin stock'}
                        </button>

                        <button 
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                        >
                            ← Seguir comprando
                        </button>
                    </div>

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">🚚 Información de envío</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• Envío a todo Chile</li>
                            <li>• Tiempo estimado: 3-5 días hábiles</li>
                            <li>• Gratis en compras sobre $10.000</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6">Productos relacionados</h2>
                <p className="text-gray-500">Próximamente...</p>
            </div>
        </div>
    );
};

export default ProductDetail;