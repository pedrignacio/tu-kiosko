import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        'Todos',
        'Bolsas de Papel',
        'Salud e Higiene',
        'Ferretería'
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">TU KIOSKO</h1>
            
            <div className="mb-6 flex gap-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === 'Todos' ? 'all' : cat)}
                        className={`px-4 py-2 rounded ${
                            selectedCategory === (cat === 'Todos' ? 'all' : cat)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <ProductList category={selectedCategory} />
        </div>
    );
};

export default Home;