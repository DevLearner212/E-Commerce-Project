import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function StripeInti() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the clientSecret from your backend when the component mounts
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post('/api/v1/onsko/create-payment-intent');
                setClientSecret(response.data.clientSecret);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching client secret', error);
                setLoading(false);
            }
        };

        fetchClientSecret();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://e-commerce-project-dw75.onrender.com/payment-success',
            },
        });

        if (error) {
            console.error(error.message);
        } else {
            console.log('Payment successful');
        }
    }
    if (loading) return <div>Loading...</div>;
    return (
        <>

            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button type="submit" disabled={loading || !stripe || !elements}>
                    Pay Now
                </button>
            </form>
        </>
    )
}
