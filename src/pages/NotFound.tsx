import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8">
                <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
                    Página no encontrada
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8">
                    Lo sentimos, la página que buscas no existe.
                </p>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        ← Volver
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        🏠 Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;