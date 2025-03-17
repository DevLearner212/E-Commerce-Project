import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
export default function Blog() {
    const [changeX, setchangeX] = useState(false)
    const [postdata, setpostdata] = useState([])
    const navigate = useNavigate()
    const getblogposts = useCallback(async () => {
        try {
            const response = await axios.get('/api/v1/onsko/getblogs')
            setpostdata([...response.data])
        } catch (error) {
            console.log(error.message);
        }
    }, [])
    useEffect(() => {
        getblogposts()

    }, [])

    const handleLoginAuth = () => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/cart");
        } else {
            navigate("/login")
        }
    }



    return (
        <>
            <nav className="relative cursor-pointer w-[90%] mx-auto h-10 flex items-center justify-between px-3 rounded-3xl lg:mt-8 bg-orange-700">
                <div className="flex items-center w-40 h-full pr-4">
                    <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                    <h1 className="text-2xl text-white font-semibold ml-2">onsko</h1>
                </div>

                <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center md:hidden">
                    <img className="w-6" src="./icon.png" alt="Menu Toggle" />
                </div>

                <div className={`absolute top-0 left-0 w-full h-[20rem] bg-orange-600 z-[999] rounded-l-lg ${changeX ? 'block' : 'hidden'} md:hidden`}>
                    <div className="flex items-center justify-between w-full h-10 px-3">
                        <div className="flex items-center w-40 h-full pr-14">
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                            <h1 className="text-2xl text-white font-semibold ml-2">onsko</h1>
                        </div>
                        <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center">
                            <img className="w-5" src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" alt="Close Menu" />
                        </div>
                    </div>
                    {/* for mobile */}
                    <div className="w-full h-[85%] p-5">
                        <ul className="text-white space-y-4 text-justify cursor-pointer tracking-tighter">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li>About</li>
                            <li><Link to="/cart">Wishlist</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>
                </div>

                {/* for tablet */}
                <div className="hidden md:flex md:w-full md:h-full md:items-center md:pl-14">
                    <ul className="flex gap-8 text-white">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li>About</li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="hidden md:flex md:w-20 md:h-full md:items-center md:justify-end md:pr-2">
                    <img onClick={handleLoginAuth} className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png" alt="Profile Icon" />
                </div>
            </nav >

            <div className="w-full flex flex-wrap justify-center md:justify-center md:gap-12 h-auto">
                {postdata.map((items) => {

                    const date = new Date(items?.createdAt)
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    const relativeTime = formatDistanceToNow(date, { addSuffix: true });
                    return (
                        <motion.div initial={{ y: "100%" }} animate={{ y: "0" }} transition={{ duration: 0.5 }} key={items?._id} className="max-w-sm rounded overflow-hidden shadow-lg mt-5 md:w-80 lg:w-96   ">
                            <img className="w-full" src={items?.Blogpost} alt="Complexion Tips" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{items?.headlines}</div>
                                <p className="text-gray-700 text-base">
                                    {items?.bio}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{formattedDate}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{relativeTime}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </>

    )
}
