import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        onAddToCart(product);
        
        // Notificación toast personalizada
        toast.success(
            () => (
                <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                        <p className="font-bold">{product.name}</p>
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

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1">
            {/* Imagen del producto */}
            <Link to={`/product/${product.id}`}>
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    {product.imageUrl ? (
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                            📦
                        </div>
                    )}
                </div>
            </Link>

            {/* Información del producto */}
            <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition dark:text-white">
                    {product.name}
                </h3>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {product.description || 'Sin descripción'}
            </p>

            {/* Precio y stock */}
            <div className="mb-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toLocaleString('es-CL')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {product.quantity > 0 ? (
                        <span className="text-green-600 dark:text-green-400">✓ Stock disponible ({product.quantity})</span>
                    ) : (
                        <span className="text-red-600 dark:text-red-400">✗ Sin stock</span>
                    )}
                </p>
            </div>

            {/* Botón agregar al carrito */}
            <button 
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    product.quantity > 0
                        ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
                {product.quantity > 0 ? '🛒 Agregar al carrito' : 'Sin stock'}
            </button>
        </div>
    );
};

export default ProductCard;