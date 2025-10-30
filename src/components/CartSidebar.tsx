import React from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const { items, total, removeItem, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    const handleRemoveItem = (id: string, name: string) => {
        removeItem(id);
        toast.error(`${name} eliminado del carrito`, {
            icon: '🗑️',
        });
    };

    const handleClearCart = () => {
        if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
            clearCart();
            toast.success('Carrito vaciado', {
                icon: '🧹',
            });
        }
    };

    const handleUpdateQuantity = (id: string, currentQty: number, newQty: number) => {
        updateQuantity(id, newQty);
        
        if (newQty > currentQty) {
            toast.success('Cantidad aumentada', {
                icon: '➕',
                duration: 1500,
            });
        } else if (newQty < currentQty && newQty > 0) {
            toast.success('Cantidad reducida', {
                icon: '➖',
                duration: 1500,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity animate-fadeIn"
                onClick={onClose}
            />
            
            {/* Sidebar - Responsive */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transform transition-transform animate-slideInRight">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold dark:text-white">🛒 Carrito</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Barra de progreso envío gratis */}
                    {items.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3">
                            {total >= 10000 ? (
                                <div className="text-center">
                                    <p className="text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-2">
                                        <span className="text-xl">✅</span>
                                        ¡Envío GRATIS desbloqueado!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-2 font-semibold">
                                        🚚 Te faltan ${(10000 - total).toLocaleString('es-CL')} para envío gratis
                                    </p>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        {/* eslint-disable-next-line react/forbid-dom-props */}
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${Math.min((total / 10000) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 text-right">
                                        {Math.round((total / 10000) * 100)}% completado
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500 text-lg font-semibold">Tu carrito está vacío</p>
                            <p className="text-gray-400 text-sm mt-2">Agrega productos para comenzar</p>
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition bg-white">
                                    <div className="flex gap-3 sm:gap-4">
                                        {/* Imagen del producto */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.imageUrl ? (
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl">
                                                    📦
                                                </div>
                                            )}
                                        </div>

                                        {/* Info del producto */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base sm:text-lg mb-1 truncate">{item.name}</h3>
                                            <p className="text-blue-600 font-bold text-base sm:text-lg">
                                                ${(item.price * item.quantity).toLocaleString('es-CL')}
                                            </p>
                                            
                                            {/* Controles de cantidad */}
                                            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, item.quantity - 1)}
                                                    className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold transition text-sm sm:text-base"
                                                >
                                                    −
                                                </button>
                                                <span className="font-semibold text-base sm:text-lg w-6 sm:w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, item.quantity + 1)}
                                                    className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center font-bold transition text-sm sm:text-base"
                                                >
                                                    +
                                                </button>
                                                
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id, item.name)}
                                                    className="ml-auto text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1"
                                                >
                                                    🗑️ <span className="hidden sm:inline">Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-4 sm:p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-base sm:text-lg font-semibold text-gray-700">Total:</span>
                            <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                                ${total.toLocaleString('es-CL')}
                            </span>
                        </div>
                        
                        {total >= 10000 && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 rounded-lg mb-4 text-center text-sm sm:text-base">
                                ✅ <strong>¡Envío gratis!</strong>
                            </div>
                        )}
                        
                        {total < 10000 && (
                            <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
                                💡 Agrega ${(10000 - total).toLocaleString('es-CL')} más para envío gratis
                            </p>
                        )}
                        
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-blue-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-600 transition shadow-lg hover:shadow-xl mb-2"
                        >
                            Proceder al pago
                        </button>
                        
                        <button 
                            onClick={handleClearCart}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-xs sm:text-sm"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;