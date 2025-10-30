import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const categories = [
        'Todos',
        'Bolsas de Papel',
        'Salud e Higiene',
        'Ferretería'
    ];

    return (
        <div className="container mx-auto p-4 sm:p-6">
            {/* Hero Section */}
            <div className="text-center mb-6 sm:mb-8 animate-slideInUp">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-bounce-slow dark:text-white">
                    🛍️ TU KIOSKO
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    Los mejores productos para tu negocio
                </p>
            </div>

            {/* Búsqueda */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 animate-fadeIn">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍 Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-full focus:border-blue-500 focus:outline-none shadow-md smooth-transition hover:shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 smooth-transition text-xl sm:text-2xl"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
            
            {/* Filtros por categoría */}
            <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-4 animate-slideInUp">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === 'Todos' ? 'all' : cat)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold smooth-transition text-sm sm:text-base ${
                            selectedCategory === (cat === 'Todos' ? 'all' : cat)
                                ? 'bg-blue-500 text-white shadow-lg scale-105'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div className="animate-fadeIn">
                <ProductList category={selectedCategory} searchTerm={searchTerm} />
            </div>
        </div>
    );
};

export default Home;