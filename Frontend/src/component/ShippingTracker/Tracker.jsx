import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Tracker = () => {
    const [trackingNumber, setTrackingNumber] = useState();
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTrackingInfo(null);

        try {
            const response = await axios.get(`https://api.ship24.com/public/v1/trackers/search/S24DEMO456393/results`, {},
                {
                    headers: {
                        "Authorization": `Bearer apik_VVC64GIapmzzJZMpDaB9FejQ8RVC4e` // Use an environment variable
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch tracking information.');
            }
            console.log(response.data)
            setTrackingInfo(data);
        } catch (err) {
            setError(err.message);
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Tracker</h2>
            <form onSubmit={handleTrack} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                    className="border rounded px-3 py-2 mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Track Shipment
                </button>
            </form>

            {loading && <p>Loading tracking information...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {trackingInfo && (
                <div className="mt-4">
                    <h3 className="font-semibold">Tracking Details</h3>
                    <p><strong>Status:</strong> {trackingInfo.status}</p>
                    <p><strong>Current Location:</strong> {trackingInfo.currentLocation}</p>
                    <p><strong>Expected Delivery:</strong> {trackingInfo.expectedDelivery}</p>
                    <p><strong>Courier:</strong> {trackingInfo.courierName}</p>
                </div>
            )}
        </div>
    );
};

export default Tracker;
