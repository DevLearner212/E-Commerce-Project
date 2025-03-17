import React, { useCallback, useEffect, useState } from 'react';
import Header from '../Headers/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Homes() {
    const navigate = useNavigate();
    const [changeX, setchangeX] = useState(false);
    const [userProfileImage, setProfileImage] = useState();

    const getuser = useCallback(async (token) => {
        try {
            const response = await axios.post(` /api/v1/onsko/getuser`, { token });
            console.log(response)
            setProfileImage(response?.data?.profileImage);
        } catch (error) {
            console.log(error.message);
        }
    }, []);




    useEffect(() => {
        // Retrieve the token and expiration time from localStorage
        const token = JSON.parse(localStorage.getItem('token'));
        const expirationTime = localStorage.getItem('tokenExpiration');
        const now = new Date().getTime();  // Current timestamp

        // Check if the token exists and whether it has expired
        if (token && expirationTime && now > parseInt(expirationTime, 10)) {
            // Token has expired, remove it from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            console.log('Token expired and removed from localStorage');
            return;  // Exit early if the token has expired
        }

        if (token) {
            getuser(token);  // Call the function if the token is valid
        }

    }, [getuser]);




    return (
        <div className="flex flex-col justify-between lg:flex-none w-full 2xl:overflow-hidden h-[100vh] md:h-[60vh]  lg:h-[60vh] 2xl:h-[100vh] 2xl:p-0 bg-[#b03a19] bg-[url('/singlegirl.webp')] bg-cover bg-center md:bg-[url('/girls.webp')] md:bg-cover md:bg-center pt-5 rounded-2xl lg:rounded-none lg:p-0 lg:bg-transparent lg:bg-none transition-opacity duration-700 opacity-100">
            <Header value={userProfileImage} />

            {/* Mobile View */}
            <div className="w-full h-52 py-16 pl-3 space-y-2 lg:mb-32 lg:space-y-4 lg:pl-8 lg:hidden">
                <h1 className="text-4xl font-semibold text-white tracking-tighter lg:text-8xl">shine on</h1>
                <p className="text-xl text-white tracking-tighter lg:text-5xl lg:font-serif lg:tracking-wide">beauty that reflects your spirit</p>
                <button onClick={() => navigate("/shop")} className="w-52 p-2 hover:bg-yellow-500 hover:border-none text-white border-2 border-white rounded-md lg:text-2xl">
                    shop now
                </button>
            </div>

            {/* Desktop View */}
            <div className='hidden lg:w-full lg:h-full lg:rounded-xl lg:bg-[url("https://static.wixstatic.com/media/84770f_a4e5aee60e58478a8781128441765935~mv2.jpg/v1/crop/x_45,y_89,w_2955,h_1767/fill/w_1833,h_986,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/fold1_hero%20(1).jpg")] lg:bg-top lg:bg-cover lg:flex lg:flex-col lg:justify-between'>
                <nav className="relative cursor-pointer w-[90%] mx-auto 2xl:h-12 h-10 lg:flex items-center justify-between px-3 rounded-3xl bg-white lg:mt-8 hidden">
                    <div className="flex items-center w-40 h-full pr-4">
                        <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                        <h1 className="text-2xl text-green-700 font-semibold lg:ml-2">onskos</h1>
                    </div>

                    <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center md:hidden">
                        <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/5358/5358649.png" alt="Menu Toggle" />
                    </div>

                    <div className={`absolute top-0 left-0 w-full h-[20rem] bg-white rounded-l-lg ${changeX ? 'block' : 'hidden'} md:hidden`}>
                        <div className="flex items-center justify-between w-full h-10  px-3">
                            <div className="flex items-center w-40 h-full pr-14">
                                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                                <h1 className="text-2xl text-green-700 font-semibold">onsko</h1>
                            </div>
                            <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center">
                                <img className="w-5" src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" alt="Close Menu" />
                            </div>
                        </div>
                        <div className="w-full h-[85%] p-5">
                            <ul className="text-green-700 space-y-4 text-justify cursor-pointer  tracking-tighter">
                                <li>Home</li>
                                <Link to="/shop"><li>Shop</li></Link>
                                <li>About</li>
                                <li>Wishlist</li>
                                <Link to="/blog"><li>Blog</li></Link>
                                <li>Log</li>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden md:flex md:w-full md:h-full md:items-center 2xl:text-xl 2xl:font-medium md:pl-14">
                        <ul className="flex gap-8 text-green-700">
                            <li>Home</li>
                            <Link to="/shop"><li>Shop</li></Link>
                            <li>About</li>
                            <Link to="/blog"><li>Blogs</li></Link>
                        </ul>
                    </div>
                    {!userProfileImage ? (
                        <Link to='/login'>
                            <div className="hidden md:flex md:w-20 md:h-full md:items-center md:justify-end md:pr-2">
                                <img className="w-6 h-6 rounded-full" src={`https://cdn-icons-png.flaticon.com/128/2170/2170153.png`} alt="Profile Icon" />
                            </div>
                        </Link>
                    ) : (
                        <img onClick={() => navigate("/profile", { state: { value: userProfileImage } })} className="w-6 2xl:w-10 2xl:h-10 2xl:object-cover h-6 rounded-full" src={userProfileImage} alt="Profile Icon" />
                    )}
                </nav>

                <div className="w-full h-52 py-16 pl-3 space-y-2 lg:mb-32 lg:space-y-4 lg:pl-8">
                    <h1 className="text-4xl font-semibold text-white tracking-tighter lg:text-8xl">shine on</h1>
                    <motion.p
                        initial={{ y: "400%" }}
                        animate={{ y: "0%" }}
                        whileHover={{}}
                        transition={{ duration: 0.6 }}
                        className="text-xl text-white tracking-tighter lg:text-5xl lg:font-serif lg:tracking-wide">beauty that reflects your spirit</motion.p>
                    <motion.button
                        initial={{ y: "400%" }}
                        animate={{ y: "0%" }}
                        whileHover={{ backgroundColor: "yellow", color: "black" }}
                        transition={{ duration: 1 }}
                        onClick={() => navigate("/shop")} className="w-52 p-2 hover:border-none text-white border-2 border-white rounded-md lg:text-2xl">
                        shop now
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
