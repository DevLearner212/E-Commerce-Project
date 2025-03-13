import React, { useCallback, useEffect, useState } from 'react'
import '../../index.css'
import Header from '../Headers/Header'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import axios from 'axios'
import { useParams } from 'react-router-dom';
export default function Shops() {
    const navigate = useNavigate()
    const location = useLocation();
    const { type } = location.state || { type: "default" }; // Fallback to a default value if no type is provided
    const [changeX, setchangeX] = useState(false)
    const [showfilter, setshowfilter] = useState(false)

    const { name } = useParams(); // Access the route parameter


    const [products, setproduct] = useState([])

    const [isActiveIndex, setActiveIndex] = useState(null)

    const amountrange = (e) => {
        const priceRange = document.body.querySelector('#price-range');
        const thumbSize = 24 + e.value / 40
        priceRange.style.setProperty('--thumb-size', `${thumbSize}px`);
    }

    const getAllproducts = useCallback(async () => {
        try {
            const response = await axios.get("/api/getAllproducts")


            setproduct(response.data)
            setActiveIndex('all')
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    const getProduct = useCallback(async (type) => {
        if (type === "default") {
            return; // Exit if type is not valid
        }
        setActiveIndex(type)

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/onsko/getProducts/${type}`)
            // console.log(response.data?.body)
            if (type === "body") {

                setproduct(response.data?.body)
            }
            else if (type === "face") {

                setproduct(response.data?.face)
            }
            else if (type == "hair") {
                setproduct(response.data?.hair)

            }
        } catch (error) {
            console.log(error.message)
        }
    })



    useEffect(() => {
        if (type === "default") {
            getAllproducts()
        } else {

            getProduct(type)
        }
        if (name === "default") {
            getAllproducts()
        } else {

            getProduct(name)
        }

        return () => {

        }
    }, [type]); // Dependency on type



    const cartComponent = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token) {
            navigate("/cart")
        } else {
            navigate("/login")
        }
    }


    return (
        <>

            <nav className="relative  cursor-pointer  w-[90%]  mx-auto h-10 flex items-center justify-between px-3 rounded-3xl  lg:mt-8 bg-orange-700">
                <div className="flex items-center w-40 h-full pr-4">
                    <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                    <h1 className="text-2xl text-white font-semibold ml-2">onsko</h1>
                </div>

                <div onClick={() => setchangeX(prev => !prev)} className="w-10   h-full flex items-center justify-center md:hidden">
                    <img className="w-6" src="./icon.png" alt="Menu Toggle" />
                </div>

                <div className={`absolute  top-0 left-0 w-full h-[20rem] bg-orange-600 z-[999] rounded-l-lg ${changeX ? 'block' : 'hidden'} md:hidden`}>
                    <div className="flex items-center justify-between w-full h-10 px-3">
                        <div className="flex items-center w-40 h-full pr-14">
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                            <h1 className="text-2xl text-white font-semibold ml-2">onsko</h1>
                        </div>
                        <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center">
                            <img className="w-5" src="../close.png" alt="Close Menu" />
                        </div>
                    </div>

                    <div className="w-full h-[85%] p-5 ]">
                        <ul className="text-white space-y-4 text-justify cursor-pointer tracking-tighter">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li>About</li>
                            <li><Link to="/cart">Wishlist</Link></li>
                            <li><Link to="/blog">Blog</Link></li>

                        </ul>
                    </div>
                </div>

                <div className="hidden md:flex md:w-full md:h-full md:items-center md:pl-14">
                    <ul className="flex gap-8 text-white">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li>About</li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="hidden md:flex md:w-20 md:h-full md:items-center md:justify-end md:pr-2">

                    <img onClick={cartComponent} className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png" alt="Profile Icon" />
                </div>
            </nav>
            <div className="div w-full md:hidden rounded-lg mt-5 h-10 flex justify-between items-center px-2">
                <span className='text-md tracking-tighter opacity-[0.7]'>{products.length} Products</span>
                <span onClick={() => setshowfilter(prev => !prev)} className=' underline'>Filter</span>
            </div>

            <div className="div w-full  md:hidden  h-auto flex flex-col  items-center gap-6">
                {products?.map((items, i) => {
                    return <div key={i}
                        onClick={() => navigate(`/product/${items?._id}`)}
                        className="div relative  flex flex-col flex-shrink-0 w-72 ">
                        <div className="div absolute top-2 text-xs bg-[#c7dfff] p-1 left-2 text-black lg:top-5 lg:left-5">
                            Best Seller
                        </div>
                        <img
                            className='w-full h-[60vh] object-cover object-center rounded-md' src=
                            {items?.image} alt="" />
                        <span>{items?.name}</span>
                        <span><sup>₹</sup>{items?.price}</span>
                    </div>
                })}




            </div>





            <div className={`container w-full  md:hidden  h-full fixed top-0 ${showfilter ? "left-0" : " left-[60rem] "}  duration-500 bg-white flex flex-col justify-between `}>

                <div className="container w-full h-auto ">
                    <div className="div w-full border-b-[1px] border-black  h-20 flex justify-between items-center pr-3">
                        <div className="div w-52 flex items-baseline justify-start pl-5 py-5 gap-1    h-full">
                            <h1 className='text-xl tracking-tighter  font-medium '>Filter</h1>
                            <span className='text-sm tracking-tighter opacity-[0.7]'>({products.length} Products)</span>
                        </div>
                        <img onClick={() => setshowfilter(prev => !prev)} className='w-5 mb-2' src="https://cdn-icons-png.flaticon.com/128/9199/9199686.png" alt="" />
                    </div>


                    <div className="div w-full md:hidden pl-2  mt-4 h-auto ">
                        <ul className=' space-y-2  cursor-pointer  text-justify'>
                            <li onClick={() => getAllproducts()} className={`${isActiveIndex === null ? "" : "underline"}underline`}>All Products</li>
                            <li onClick={() => getProduct("body")} className={`${isActiveIndex === "body" ? "underline" : ""}`}>body care</li>
                            <li onClick={() => getProduct("face")} className={`${isActiveIndex === "face" ? "underline" : ""}`}>face care</li>
                            <li onClick={() => getProduct("hair")} className={`${isActiveIndex === "hair" ? "underline" : ""}`}>hair care</li>

                        </ul>
                    </div>

                </div>
                <div className="w-full border-t-[1px] border-black border-opacity-[0.5] h-20 flex justify-center items-center gap-3">
                    <button onClick={() => navigate(0)} className=' w-32 tracking-tighter border-2 border-black p-1  opacity-[0.6] text-sm '>Clear Filters</button>

                    <button onClick={() => setshowfilter(prev => !prev)} className=' w-32 tracking-tighter border-2 border-black p-1 bg-black text-white text-sm   '>Apply</button>
                </div>




            </div>









            {/* tablet responsive design start from here */}


            <div className="hidden md:flex div  w-full   mt-5 h-auto">

                {/* Left container start from here  */}

                <div className="left w-52 md:w-44 md:px-0 lg:w-72  lg:px-10   flex flex-col p-10">
                    <h1 className='text-xl mb-4 font-semibold'>browser by</h1>
                    <hr className='border-[1px] opacity-[0.2] border-black ' />

                    <div className="div w-full   mt-4 h-auto ">
                        <ul className=' space-y-2  cursor-pointer  text-justify'>
                            <li onClick={() => getAllproducts()} className={`${!isActiveIndex === null ? "" : ""}  flex items-center gap-2  `}>
                                <img className='w-6 object-cover rounded-xl' src="https://cdn-icons-png.flaticon.com/128/10951/10951869.png" alt="" />
                                All Products</li>
                            <li onClick={() => getProduct("body")} className={`${isActiveIndex === "body" ? "underline" : ""} flex items-center gap-2 `}>
                                <img className='w-6 object-cover rounded-xl' src="http://localhost:5173/public/big/boyBody.webp" alt="" />
                                body care</li>
                            <li onClick={() => getProduct("face")} className={`${isActiveIndex === "face" ? "underline" : ""} flex items-center gap-2`}>
                                <img className='w-6 object-cover rounded-xl' src="http://localhost:5173/public/big/womanFace.webp" alt="" />
                                face care</li>
                            <li onClick={() => getProduct("hair")} className={`${isActiveIndex === "hair" ? "underline" : ""} flex items-center gap-2`}>
                                <img className='w-6 object-cover rounded-xl' src="http://localhost:5173/public/big/womanHair.webp" alt="" />
                                hair care</li>

                        </ul>
                    </div>




                </div>

                {/* Right container start from here. */}
                <div className="right  flex flex-wrap justify-between items-start py-8 px-5 lg:px-14 md:gap-y-10      w-[80%] xl:px-0 2xl:px-0 2xl:gap-5  gap-1   ">
                    {products.map((items, i) => {

                        return <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} key={i} onClick={() => navigate(`/product/${items?._id}`)} className="div relative flex flex-col flex-shrink-0 w-60  md:w-64 lg:w-72 xl:w-[23rem] ">

                            <div className="div absolute top-4 text-xs bg-[#c7dfff] p-1 left-4 text-black lg:top-5 lg:left-5">
                                Best Seller
                            </div>
                            <img
                                className='w-full h-[60vh] md:h-[30vh] lg:h-[30vh] xl:h-[40vh] 2xl:h-[60vh]   object-cover object-center rounded-md' src=
                                {items?.image} alt="" />
                            <span className='text-xl md:text-sm xl:text-xl'>{items?.name}</span>
                            <span className='md:text-sm xl:text-xl'><sup>₹</sup>{items?.price}</span>
                        </motion.div>
                    })}


                </div>
            </div>











        </>
    )
}
