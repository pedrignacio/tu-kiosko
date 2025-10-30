import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Product } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const favorited = isFavorite(product.id);

    const handleAddToCart = () => {
        onAddToCart(product);
        
        toast.success(
            () => (
                <div className="flex items-center gap-4">
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
                    
                    <div className="flex-1">
                        <p className="font-bold text-white mb-1">{product.name}</p>
                        <p className="text-sm text-green-100">✓ Agregado al carrito</p>
                        <p className="text-xs text-green-200 mt-1">
                            ${product.price.toLocaleString('es-CL')}
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

    const handleToggleFavorite = () => {
        if (favorited) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    const isNew = () => {
        if (!product.created_at) return false;
        const createdDate = new Date(product.created_at);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1 relative">
            {/* Badge NUEVO - Más pequeño en móvil */}
            {isNew() && (
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg z-10 animate-pulse">
                    🆕 NUEVO
                </div>
            )}

            {/* Botón de favoritos - Más pequeño en móvil */}
            <button
                onClick={handleToggleFavorite}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-white dark:bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
                <span className="text-lg sm:text-2xl">
                    {favorited ? '❤️' : '🤍'}
                </span>
            </button>

            {/* Imagen del producto - Más pequeña en móvil */}
            <Link to={`/product/${product.id}`}>
                <div className="w-full h-32 sm:h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 sm:mb-4 overflow-hidden">
                    {product.imageUrl ? (
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl sm:text-6xl">
                            📦
                        </div>
                    )}
                </div>
            </Link>

            {/* Información del producto */}
            <Link to={`/product/${product.id}`}>
                <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition dark:text-white line-clamp-2">
                    {product.name}
                </h3>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 hidden sm:block">
                {product.description || 'Sin descripción'}
            </p>

            {/* Precio y stock */}
            <div className="mb-2 sm:mb-4">
                <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toLocaleString('es-CL')}
                </p>
                <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                    {product.quantity > 0 ? (
                        <span className="text-green-600 dark:text-green-400">✓ Stock ({product.quantity})</span>
                    ) : (
                        <span className="text-red-600 dark:text-red-400">✗ Sin stock</span>
                    )}
                </p>
            </div>

            {/* Botón agregar al carrito - Más compacto en móvil */}
            <button 
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`w-full py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-base transition-all duration-300 ${
                    product.quantity > 0
                        ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
                {product.quantity > 0 ? '🛒 Agregar' : 'Sin stock'}
            </button>
        </div>
    );
};

export default ProductCard;