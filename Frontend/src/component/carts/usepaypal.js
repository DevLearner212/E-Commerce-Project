import { useEffect } from 'react';
import axios from 'axios';

const usePayPal = (clientId, backendUrl) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
            window.paypal.Buttons({
                createOrder: async (data, actions) => {
                    const response = await axios.post(`${backendUrl}/create/order`);
                    return response.data.id; // Return the order ID from the backend
                },
                onApprove: async (data, actions) => {
                    await actions.order.capture();
                    alert(`Payment successful! Transaction ID: ${data.orderID}`);
                },
                onError: (err) => {
                    console.error('PayPal Checkout onError', err);
                },
            }).render('#paypal-button-container');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Clean up the script when the component unmounts
        };
    }, [clientId, backendUrl]);
};

export default usePayPal;
