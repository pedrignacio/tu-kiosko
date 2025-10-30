import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
        </>
    );
};

export default MobileMenu;