import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Omit<Product, 'quantity'>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img 
                src={product.imageUrl || 'https://via.placeholder.com/300'} 
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
            <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;