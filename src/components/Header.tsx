import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
    const { items } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors duration-300">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                        <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">🛒</span>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white smooth-transition group-hover:text-blue-500 dark:group-hover:text-blue-400">
                            TU KIOSKO
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Carrito */}
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 sm:p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 smooth-transition hover:scale-110 shadow-lg"
                        >
                            <span className="text-xl sm:text-2xl">🛒</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        >
                            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <MobileMenu 
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    onOpenCart={() => {
                        setIsCartOpen(true);
                        setIsMobileMenuOpen(false);
                    }}
                    cartItemsCount={totalItems}
                />
            </header>

            {/* Cart Sidebar */}
            {isCartOpen && (
                <CartSidebar 
                    isOpen={isCartOpen} 
                    onClose={() => setIsCartOpen(false)} 
                />
            )}
        </>
    );
};

export default Header;