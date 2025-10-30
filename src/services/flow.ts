import axios from 'axios';

const FLOW_API_URL = import.meta.env.VITE_FLOW_API_URL || 'https://www.flow.cl/api';
const FLOW_API_KEY = import.meta.env.VITE_FLOW_API_KEY;

export const createPayment = async (amount: number, orderId: string) => {
  try {
    const response = await axios.post(`${FLOW_API_URL}/payment/create`, {
      apiKey: FLOW_API_KEY,
      commerceOrder: orderId,
      subject: `Pedido TU KIOSKO #${orderId}`,
      amount: amount,
      urlConfirmation: `${window.location.origin}/order-confirmation`,
      urlReturn: `${window.location.origin}/order-confirmation`,
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear pago con Flow:', error);
    throw error;
  }
};