import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function PaymentPage() {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(3); // Initial countdown time in seconds

    useEffect(() => {
        // Set an interval to decrease the countdown every second
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    clearInterval(interval);  // Stop the interval when countdown reaches 0
                    navigate("/"); // Navigate to the desired page
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [navigate]);
    return (
        <>
            <h1 className='text-5xl text-center mb-10'>Redirect after {countdown} second....</h1>
            <div className="payment-success-container flex justify-center items-center w-screen h-full">
                <div className="payment-success-message  flex justify-center flex-col gap-2 items-center">
                    <img className='w-6' src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png" alt="" />
                    <h2 className="payment-success-title">Payment Successful</h2>
                    <p className="payment-success-text">Your payment has been processed successfully. Thank you for your purchase!</p>
                </div>
            </div>
        </>
    )
}
