import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';

const Header: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { items } = useCart();
    
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <header className="bg-gray-800 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="text-3xl font-bold hover:text-blue-400 transition">
                            🛍️ TU KIOSKO
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-6">
                            <Link 
                                to="/" 
                                className="hover:text-blue-400 transition font-medium"
                            >
                                Inicio
                            </Link>
                            
                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative hover:text-blue-400 transition font-medium flex items-center gap-2"
                            >
                                <span>🛒 Carrito</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;