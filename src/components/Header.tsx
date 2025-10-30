import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { itemCount } = useCart();

    return (
        <>
            <header className="bg-gray-800 dark:bg-gray-900 text-white shadow-lg sticky top-0 z-30 transition-colors duration-300">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden text-white hover:text-blue-400 transition"
                            title="Open mobile menu"
                        >
                            <svg 
                                className="w-8 h-8" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link to="/" className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition">
                            🛍️ TU KIOSKO
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link 
                                to="/" 
                                className="hover:text-blue-400 transition font-medium"
                            >
                                Inicio
                            </Link>
                            
                            {/* Theme Toggle */}
                            <ThemeToggle />
                            
                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative hover:text-blue-400 transition font-medium flex items-center gap-2 bg-blue-600 dark:bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800"
                            >
                                <span className="hidden sm:inline">🛒 Carrito</span>
                                <span className="sm:hidden">🛒</span>
                                {itemCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </nav>

                        {/* Mobile Right Section */}
                        <div className="md:hidden flex items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative bg-blue-600 dark:bg-blue-700 px-3 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                            >
                                <span>🛒</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;