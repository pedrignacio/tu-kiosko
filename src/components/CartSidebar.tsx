import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const { items, total, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">🛒 Carrito</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                            <p className="text-gray-400 text-sm mt-2">Agrega productos para comenzar</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Cantidad: {item.quantity}
                                            </p>
                                            <p className="text-blue-600 font-bold mt-2">
                                                ${(item.price * item.quantity).toLocaleString('es-CL')}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 ml-4"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ${total.toLocaleString('es-CL')}
                            </span>
                        </div>
                        
                        {total >= 10000 && (
                            <p className="text-green-600 text-sm mb-4">
                                ✅ ¡Envío gratis!
                            </p>
                        )}
                        
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition mb-2"
                        >
                            Proceder al pago
                        </button>
                        
                        <button 
                            onClick={clearCart}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
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