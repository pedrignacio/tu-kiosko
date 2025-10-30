import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, totalAmount, customerName } = location.state || {};

    if (!orderId) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">No hay información del pedido</h1>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                {/* Icono de éxito */}
                <div className="mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                        <span className="text-6xl">✅</span>
                    </div>
                </div>

                {/* Título */}
                <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                    ¡Pedido confirmado!
                </h1>

                {/* Saludo personalizado */}
                {customerName && (
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                        Gracias por tu compra, <strong>{customerName}</strong>
                    </p>
                )}

                {/* Detalles del pedido */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-600">
                            <span className="text-gray-600 dark:text-gray-300">N° de Pedido:</span>
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">#{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-600">
                            <span className="text-gray-600 dark:text-gray-300">Total pagado:</span>
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${totalAmount?.toLocaleString('es-CL') || '0'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Estado:</span>
                            <span className="bg-yellow-100 dark:bg-yellow-200 text-yellow-800 dark:text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                En proceso
                            </span>
                        </div>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-6 text-left">
                    <p className="text-blue-800 dark:text-blue-300 font-semibold mb-2">📧 Te enviamos un correo de confirmación</p>
                    <p className="text-blue-700 dark:text-blue-200 text-sm">
                        Revisa tu bandeja de entrada para ver los detalles de tu pedido.
                        Si no lo recibes, revisa tu carpeta de spam.
                    </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-400 p-4 mb-6 text-left">
                    <p className="text-green-800 dark:text-green-300 font-semibold mb-2">🚚 Tiempo estimado de entrega</p>
                    <p className="text-green-700 dark:text-green-200 text-sm">
                        Tu pedido llegará en <strong>3-5 días hábiles</strong>.
                        Te notificaremos cuando sea despachado.
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