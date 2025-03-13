import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Homes from '../Home/Homes';
import LastFile from '../wrong/LastFile';
import { motion } from 'framer-motion';

export default function Bottom() {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const getSellerProduct = useCallback(async () => {
        setLoading(true); // Set loading to true before the request
        try {
            const response = await axios.get("/api/getAllproducts");
            setProduct(response.data);
        } catch (error) {
            console.error(error.message);
            // Handle error appropriately, possibly with a component
        } finally {
            setLoading(false); // Set loading to false after the request
        }
    }, []);

    useEffect(() => {
        getSellerProduct();
    }, [getSellerProduct]);

    return (
        <>
            <Homes />

            <div className="div w-full 2xl:mt-5 h-auto p-3">
                <div className='w-full h-10 flex justify-between items-center px-2'>
                    <h1 className='font-bold text-lg lg:text-3xl'>Best Sellers</h1>
                    <button onClick={() => navigate("/shop")} className='border-2 border-black p-1 font-semibold text-xs rounded-md lg:w-32 lg:h-10 lg:text-lg'>View More</button>
                </div>

                {loading ? ( // Loading indicator
                    <div className="flex justify-center items-center h-32">
                        <div className="loader">Loading...</div> {/* Replace with your loading animation */}
                    </div>
                ) : (
                    <div className="div w-full border-black overflow-x-scroll   2xl:overflow-hidden mt-3 h-[66%] flex no-scrollbar gap-5 lg:mt-8 lg:pl-[29rem] lg:px-0 xl:pl-12 2xl:pl-[48rem] 2xl:px-5 lg:items-center lg:justify-center">
                        {products.slice(0, 6).map((item, i) => (
                            <motion.div
                                key={i}
                                onClick={() => navigate(`/product/${item?._id}`)}
                                className="div 2xl:mt-5 transition-transform duration-200  hover:scale-105 relative flex flex-col flex-shrink-0 w-60 h-80 md:w-72 md:h-96 lg:h-[30rem] lg:w-[21rem] 2xl:h-[30rem]"
                            >
                                <div className="div absolute top-2 text-xs bg-[#c7dfff] p-1 left-2 text-black lg:top-5 lg:left-5">Best Seller</div>
                                <img className='w-80  h-[85%] 2xl:h-96  object-cover object-center rounded-md' src={item?.image} alt="" />
                                <span>{item?.name}</span>
                                <span><sup>₹</sup>{item?.price}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Phone responsive designs start */}
            <div className="div w-full flex justify-center  items-center h-auto md:hidden">
                <div className='w-[90%] h-full relative'>
                    <div className="div absolute text-white font-semibold pr-10 top-3 left-2">
                        <h1 className='text-2xl md:text-3xl'>Effortless beauty, timeless charm.</h1>
                        <p className='text-xl font-mono tracking-tighter md:text-2xl'>New arrivals now in stock</p>
                        <button onClick={() => navigate("/shop")} className='border-[1px] mt-2 hover:bg-yellow-500 hover:text-black border-white rounded-md w-32 p-1 text-sm md:text-base'>Shop Me</button>
                    </div>
                    <img className='object-cover rounded-t-lg w-full' src="https://static.wixstatic.com/media/c837a6_ce2611b99f714d55ac39dd982c0e2dc3~mv2.jpg/v1/crop/x_1008,y_0,w_1237,h_1792/fill/w_408,h_590,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/fold3_banner.jpg" alt="" />
                    <marquee behavior="" direction="right" className="bg-yellow-300 rounded-b-lg w-full h-10 flex justify-center items-center text-xl text-green-600 font-extrabold">
                        <span className='flex items-center gap-5'>Free shipping on orders over $50
                            <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="" /> Free shipping on orders over $50
                            <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="" />
                        </span>
                    </marquee>
                </div>
            </div>

            {/* Tablet responsive designs start */}
            <div className="hidden md:flex rounded-t-2xl div w-full justify-start items-end h-[70%] md:h-[60vh] lg:h-[60vh] bg-[url('https://static.wixstatic.com/media/c837a6_ce2611b99f714d55ac39dd982c0e2dc3~mv2.jpg/v1/crop/x_374,y_541,w_2233,h_1251/fill/w_874,h_490,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/fold3_banner.jpg')] bg-cover bg-center lg:bg-[url('https://static.wixstatic.com/media/c837a6_ce2611b99f714d55ac39dd982c0e2dc3~mv2.jpg/v1/crop/x_0,y_514,w_2688,h_1278/fill/w_1834,h_873,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/fold3_banner.jpg')] lg:bg-cover lg:bg-center lg:mt-5 lg:w-full   lg:mx-auto 2xl:w-full 2xl:h-[100vh]">
                <div className="div text-white font-semibold pr-10 mb-5 ml-5 lg:pr-0 lg:mb-10">
                    <h1 className='md:text-2xl tracking-tighter w-60 lg:text-6xl lg:w-[40rem]'>Effortless beauty, timeless charm.</h1>
                    <p className='font-mono tracking-tighter md:text-lg lg:text-5xl'>New arrivals now in stock</p>
                    <button onClick={() => {
                        setTimeout(() => {
                            navigate("/shop");
                        }, 500);
                    }} className='border-[1px] mt-2 border-white rounded-md w-32 p-1 text-sm md:text-base lg:w-52 lg:p-3 lg:text-xl lg:mt-5'>Shop Me</button>
                </div>
            </div>

            <marquee behavior="" direction="right" className="hidden md:flex bg-yellow-300 rounded-b-lg w-full h-10 lg:w-full lg:mx-auto lg:text-4xl justify-center items-center text-xl text-green-600 font-extrabold">
                <span className='flex items-center gap-5'>Free shipping on orders over $50
                    <img className='w-5 lg:w-8' src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="" /> Free shipping on orders over $50
                    <img className='w-5 lg:w-8' src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="" />
                </span>
            </marquee>

            <div className='w-full h-auto p-3 lg:px-10 '>
                <div className='w-full h-10 flex justify-between items-center px-2 2xl:px-0 lg:mt-4'>
                    <h1 className='font-bold text-lg lg:text-3xl'>Shop by Category</h1>
                    <button onClick={() => navigate("/shop")} className='border-2 border-black p-1 font-semibold text-xs rounded-md lg:w-32 lg:h-10 lg:text-lg'>Shop Now</button>
                </div>

                <div className="div mt-5 w-full md:overflow-scroll no-scrollbar flex flex-col justify-center items-center h-full gap-5 md:flex-row md:justify-center lg:mt-10 lg:justify-between  ">

                    {/* Category Cards */}
                    <div className="div w-60 p-5 bg-gray-300 hover:bg-purple-500 hover:text-white rounded-xl h-80 flex flex-col items-center justify-center gap-5 lg:w-[385.837px] lg:h-[536.65px] xl:w-[25rem]">
                        <img className='w-[15rem] h-52 object-cover rounded-lg md:h-72 md:object-cover lg:hidden' src="./public/big/womanHair.webp" alt="" />
                        <img className='hidden w-[10rem] lg:block lg:w-[20rem] lg:h-[26rem] lg:object-cover lg:rounded-xl xl:w-96' src='./public/big/womanHair.webp' alt="" />
                        <button onClick={() => navigate("/shop", { state: { type: "hair" } })} className='w-40 p-1 rounded-xl border-2 border-black text-5xl font-semibold tracking-tighter md:text-3xl lg:text-4xl lg:w-60'>Hair</button>
                    </div>
                    <div className="div w-60 p-5 bg-gray-300 hover:bg-green-500 hover:text-white rounded-xl h-80 flex flex-col items-center justify-center gap-5 lg:w-[385.837px] lg:h-[536.65px] xl:w-[25rem]">
                        <img className='w-[15rem] h-52 object-cover object-center rounded-lg md:h-72 md:object-cover lg:hidden' src="./public/big/boyBody.webp" alt="" />
                        <img className='hidden w-[10rem] lg:block lg:w-[20rem] lg:h-[26rem] lg:object-cover lg:rounded-xl xl:w-96' src='./public/big/boyBody.webp' alt="" />
                        <button onClick={() => navigate("/shop", { state: { type: "body" } })} className='w-40 p-1 rounded-xl border-2 border-black text-5xl font-semibold tracking-tighter md:text-3xl lg:text-4xl lg:w-60'>Body</button>
                    </div>


                    <div className="div w-60 p-5 bg-gray-300 hover:bg-orange-600 hover:text-white rounded-xl h-80 flex flex-col items-center justify-center gap-5 lg:w-[385.837px] lg:h-[536.65px] xl:w-[25rem]">
                        <img className='w-[15rem] h-52 object-cover object-top rounded-lg md:h-72 md:object-cover lg:hidden' src="./public/big/womanFace.webp" alt="" />
                        <img className='hidden w-[10rem] object-cover object-center lg:block lg:w-[20rem] lg:h-[26rem] lg:object-cover lg:rounded-xl xl:w-96' src='./public/big/womanFace.webp' alt="" />
                        <button onClick={() => navigate("/shop", { state: { type: "face" } })} className='w-40 p-1 rounded-xl border-2 border-black text-5xl font-semibold tracking-tighter md:text-3xl lg:text-4xl lg:w-60'>Face</button>
                    </div>
                </div>














            </div>

            <div className='w-full h-auto mt-5 flex flex-col items-center'>
                <img className='w-5 md:w-10 md:mb-1' src="https://cdn-icons-png.flaticon.com/128/1384/1384031.png" alt="" />
                <h1 className='text-md md:text-3xl font-medium md:tracking-tighter'>Follow us on Instagram</h1>
                <p className='text-sm md:text-xl font-serif md:tracking-tighter'>Stay updated on the latest trends.</p>
            </div>
        </>
    );
}
