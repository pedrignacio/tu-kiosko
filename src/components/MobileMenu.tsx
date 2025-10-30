import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenCart: () => void;
    cartItemsCount: number;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenCart, cartItemsCount }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fadeIn"
                onClick={onClose}
            />
            
            {/* Menu Sidebar */}
            <div className="fixed left-0 top-0 h-full w-80 bg-gray-800 text-white shadow-2xl z-50 md:hidden animate-slideInLeft">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">🛍️ Menú</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-6">
                    <ul className="space-y-4">
                        <li>
                            <Link 
                                to="/" 
                                onClick={onClose}
                                className="flex items-center gap-3 text-lg hover:text-blue-400 transition py-3 px-4 rounded-lg hover:bg-gray-700"
                            >
                                <span>🏠</span>
                                <span>Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                onClick={onClose}
                                className="flex items-center gap-3 text-lg hover:text-blue-400 transition py-3 px-4 rounded-lg hover:bg-gray-700"
                            >
                                <span>📦</span>
                                <span>Productos</span>
                            </Link>
                        </li>
                        <li>
                            <a 
                                href="#about" 
                                onClick={onClose}
                                className="flex items-center gap-3 text-lg hover:text-blue-400 transition py-3 px-4 rounded-lg hover:bg-gray-700"
                            >
                                <span>ℹ️</span>
                                <span>Acerca de</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#contact" 
                                onClick={onClose}
                                className="flex items-center gap-3 text-lg hover:text-blue-400 transition py-3 px-4 rounded-lg hover:bg-gray-700"
                            >
                                <span>📧</span>
                                <span>Contacto</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Footer del menú */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
                    <div className="text-sm text-gray-400 space-y-2">
                        <p className="flex items-center gap-2">
                            <span>📞</span>
                            <a href="tel:+56912345678" className="hover:text-blue-400">
                                +56 9 1234 5678
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <span>📧</span>
                            <a href="mailto:contacto@tukiosko.cl" className="hover:text-blue-400">
                                contacto@tukiosko.cl
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Additional Features */}
            <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-slideDown">
                <div className="container mx-auto px-4 py-4 space-y-4">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Tema</span>
                        <ThemeToggle />
                    </div>

                    {/* Carrito móvil */}
                    <button 
                        onClick={onOpenCart}
                        className="w-full flex items-center justify-between py-3 px-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                        <span className="font-bold">🛒 Ver Carrito</span>
                        {cartItemsCount > 0 && (
                            <span className="bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>

                    {/* Línea divisoria */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                        <button 
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            Cerrar menú
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;