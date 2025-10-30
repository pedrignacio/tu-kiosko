import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const { orderId, totalAmount } = location.state || {};

    return (
        <div className="order-confirmation">
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu pedido ha sido confirmado.</p>
            <p>ID de pedido: {orderId}</p>
            <p>Monto total: ${totalAmount}</p>
            <p>Recibirás un correo electrónico con los detalles de tu pedido.</p>
        </div>
    );
};

export default OrderConfirmation;