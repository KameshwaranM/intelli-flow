import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { URL_Upgrade_Plan_DATA } from '../API/ProjectAPI';

// Load your publishable key
const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [sessionKey, setSessionKey] = useState(null);

    // Retrieve session key from local storage
    useEffect(() => {
        const key = localStorage.getItem("sessionKey");
        console.log("Session Key Retrieved:", key); // Debug log
        setSessionKey(key);
    }, []);

    // Fetch clientSecret from the backend when sessionKey is available
    useEffect(() => {
        if (!sessionKey) {
            console.log("Session Key is not available yet.");
            return;
        }

        console.log("Fetching clientSecret with sessionKey:", sessionKey); // Debug log
        fetch(URL_Upgrade_Plan_DATA, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'SESSIONKEY': sessionKey 
            },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log("Client Secret fetched:", data.clientSecret); // Debug log
            setClientSecret(data.clientSecret);
        })
        .catch(error => {
            console.error("Error fetching clientSecret:", error); // Debug log
        });
    }, [sessionKey]); // Run this effect only when sessionKey changes

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                console.log('[error]', error);
            } else {
                console.log('[PaymentIntent]', paymentIntent);
            }
        } catch (error) {
            console.error("Error confirming card payment:", error); // Debug log
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default Payment;
