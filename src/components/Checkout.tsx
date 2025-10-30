import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';

const Checkout: React.FC = () => {
    const { items, total, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const shippingCost = total >= 10000 ? 0 : 3000;
    const finalTotal = total + shippingCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validaciones
        if (!formData.name.trim()) {
            toast.error('El nombre es requerido');
            return;
        }
        
        if (!formData.email.includes('@')) {
            toast.error('Email inválido');
            return;
        }
        
        if (formData.phone.length < 9) {
            toast.error('Teléfono inválido');
            return;
        }
        
        if (!formData.address.trim()) {
            toast.error('La dirección es requerida');
            return;
        }
        
        // Mostrar notificación de procesamiento
        const loadingToast = toast.loading('Procesando pedido...');
        
        // Simular procesamiento
        setTimeout(() => {
            toast.dismiss(loadingToast);
            toast.success('¡Pedido confirmado!', {
                duration: 4000,
                icon: '🎉',
            });
            
            clearCart();
            navigate('/order-confirmation', { 
                state: { 
                    orderId: Date.now().toString(), 
                    totalAmount: finalTotal,
                    customerName: formData.name
                } 
            });
        }, 1500);
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Carrito vacío</h1>
                <p className="text-gray-600 mb-6">No tienes productos en tu carrito</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Ir a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Datos de envío</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Nombre completo *
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Ej: Juan Pérez"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email *
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="ejemplo@correo.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                Teléfono *
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                required
                                placeholder="+56 9 1234 5678"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-2">
                                Dirección de envío *
                            </label>
                            <textarea
                                id="address"
                                required
                                placeholder="Calle, número, comuna, región"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition mt-6"
                        >
                            Confirmar pedido (${finalTotal.toLocaleString('es-CL')})
                        </button>
                    </form>
                </div>

                {/* Resumen */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                </div>
                                <p className="font-bold">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                            </div>
                        ))}

                        <div className="pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-bold">${total.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío:</span>
                                <span className={shippingCost === 0 ? 'text-green-600 font-bold' : 'font-bold'}>
                                    {shippingCost === 0 ? '¡GRATIS!' : `$${shippingCost.toLocaleString('es-CL')}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-2">
                                <span>Total:</span>
                                <span className="text-blue-600">${finalTotal.toLocaleString('es-CL')}</span>
                            </div>
                        </div>

                        {total < 10000 && (
                            <p className="text-sm text-gray-600 mt-4">
                                💡 Agrega ${(10000 - total).toLocaleString('es-CL')} más para envío gratis
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;