import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

const Favorites: React.FC = () => {
    const navigate = useNavigate();
    const { favorites, clearFavorites } = useFavorites();
    const { addItem } = useCart();

    if (favorites.length === 0) {
        return (
            <div className="container mx-auto p-6">
                <Breadcrumbs 
                    items={[
                        { label: '🏠 Inicio', path: '/' },
                        { label: '❤️ Favoritos' }
                    ]}
                />

                <div className="text-center py-16">
                    <span className="text-8xl mb-6 block animate-bounce-slow">💔</span>
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">
                        No tienes favoritos
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                        Agrega productos que te gusten para verlos aquí
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
                    >
                        🛍️ Ir a la tienda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Breadcrumbs 
                items={[
                    { label: '🏠 Inicio', path: '/' },
                    { label: '❤️ Favoritos' }
                ]}
            />

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold dark:text-white mb-2">
                        ❤️ Mis Favoritos
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'}
                    </p>
                </div>

                <button
                    onClick={clearFavorites}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition shadow-lg"
                >
                    🗑️ Limpiar favoritos
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;