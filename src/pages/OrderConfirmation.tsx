import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const OrderConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, totalAmount, customerName } = location.state || {};

    if (!orderId) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">No hay información de pedido</h1>
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
        <div className="container mx-auto p-6 max-w-2xl">
            {/* Breadcrumbs */}
            <Breadcrumbs 
                items={[
                    { label: '🏠 Inicio', path: '/' },
                    { label: '🛒 Carrito' },
                    { label: '💳 Checkout' },
                    { label: '✅ Confirmación' }
                ]}
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                {/* Icono de éxito */}
                <div className="mb-6 animate-bounce-slow">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-6xl">✅</span>
                    </div>
                </div>

                {/* Mensaje principal */}
                <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                    ¡Pedido confirmado!
                </h1>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                    Gracias por tu compra, <strong>{customerName}</strong>
                </p>

                {/* Detalles del pedido */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                    <h2 className="text-lg font-bold mb-4 dark:text-white">Detalles del pedido</h2>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p><strong>Número de pedido:</strong> #{orderId}</p>
                        <p><strong>Total pagado:</strong> ${totalAmount?.toLocaleString('es-CL')}</p>
                        <p><strong>Estado:</strong> <span className="text-green-600 dark:text-green-400">✓ Confirmado</span></p>
                        <p><strong>Envío estimado:</strong> 3-5 días hábiles</p>
                    </div>
                </div>

                {/* Mensaje informativo */}
                <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 mb-6 text-left">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        📧 Te hemos enviado un correo de confirmación con los detalles de tu pedido.
                        Si no lo recibes en los próximos minutos, revisa tu carpeta de spam.
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition font-semibold"
                    >
                        🛍️ Seguir comprando
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition font-semibold"
                    >
                        🖨️ Imprimir comprobante
                    </button>
                </div>

                {/* Ayuda */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        ¿Necesitas ayuda? Contáctanos:
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
                        📞 +56 9 1234 5678 | 📧 ayuda@tukiosko.cl
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;