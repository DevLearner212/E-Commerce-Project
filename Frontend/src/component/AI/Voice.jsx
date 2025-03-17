import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Voice = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [product, setProduct] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();

    const productMap = {
        body: 'body',
        face: 'face',
        hair: 'hair',
    };

    const getProducts = async () => {
        if (!searchTerm) return;

        try {
            const response = await axios.get(`/api/v1/onsko/getProducts/${searchTerm}`);
            console.log(response.data);
            setProduct(response.data?.[searchTerm]);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            getProducts();
            navigate(`/shop/${searchTerm}`);
        }
    }, [searchTerm, navigate]);

    const startVoiceRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        setIsListening(true);

        const keywords = Object.keys(productMap);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Transcript: ", transcript);

            const foundKeyword = keywords.find(keyword => transcript.includes(keyword));
            if (foundKeyword) {
                setSearchTerm(foundKeyword);
            } else {
                console.log("No valid keywords found in the transcript.");
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Voice Search Assistant</h1>
            <button
                onClick={startVoiceRecognition}
                className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-500 transition"
            >
                Start Voice Search
            </button>
            {isListening && (
                <div className="mt-4 text-center">
                    <img
                        src=" https://i.pinimg.com/originals/42/78/76/42787621ed6d40f0c30f0ae423fc572c.gif" // Replace with the public URL of your GIF
                        alt="AI is listening"
                        className="w-32 h-32 mx-auto"
                    />
                </div>
            )}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Search Results:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {product.map((items, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/product/${items?._id}`)}
                            className="relative flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <div className="absolute top-4 left-4 bg-[#c7dfff] text-black text-xs p-1 rounded">
                                Best Seller
                            </div>
                            <img
                                className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                                src={items?.image}
                                alt={items?.name}
                            />
                            <div className="p-4 flex flex-col">
                                <span className="text-lg font-medium">{items?.name}</span>
                                <span className="text-xl font-semibold mt-2">
                                    <sup>₹</sup>{items?.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Voice;
