import { Link } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import LoadingAnimation from '../Loading/LoadingAnimation';
import UserReview from './UserReview';


export default function ProductsBuy() {
    const navigate = useNavigate()
    const [changeX, setchangeX] = useState(false)

    const [showProductInfo, setProductInfo] = useState(false);
    const [showreturnPolicy, setreturnPolicy] = useState(false);
    const [showShippingInfo, setShippingInfo] = useState(false);
    const [allproduct, setallproduct] = useState([])

    const { id } = useParams(); // Access the route parameter
    const [rating, setRating] = useState(0);
    const [product, setproduct] = useState()

    const handleRating = async (newRating) => {
        setRating(newRating);
        try {
            const response = await axios.post(`/api/v1/onsko/updaterating/${id}`, { rating: newRating })
            if (response.data.sucess == true) {
                alert("done rating..")
            }

        } catch (error) {
            console.log(error.message);

        }


    };







    const getproduct = async () => {
        try {
            const response = await axios.get(`/api/v1/onsko/getProductById/${id}`)


            setproduct(response.data)

            getcategoryProduct(response.data?.category)

        } catch (error) {
            console.log(error.message);

        }
    }
    const getcategoryProduct = async (type) => {


        try {
            const response = await axios.get(`/api/v1/onsko/getProducts/${type}`)
            // console.log(response.data?.body)
            if (type === "body") {

                setallproduct(response.data?.body)


            }
            else if (type === "face") {

                setallproduct(response.data?.face)


            }
            else {
                setallproduct(response.data?.hair)



            }
        } catch (error) {
            console.log(error.message)
        }
    }

    function shortenParagraph(text, maxLength) {
        if (text.length <= maxLength) return text; // Return the original text if it's shorter than maxLength
        const trimmedText = text.slice(0, maxLength).trim(); // Trim the text to maxLength
        const lastSpaceIndex = trimmedText.lastIndexOf(' '); // Find the last space
        return lastSpaceIndex > -1 ? trimmedText.slice(0, lastSpaceIndex) + '...' : trimmedText + '...'; // Append ellipsis
    }

    // Example usage
    const originalText = `${product?.description}`

    const shortenedText = shortenParagraph(originalText, 250); // Limit to 200 characters




    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(100, 100);
        getproduct();
    }, [id]);

    const handleDataAdd = async () => {

        let token = JSON.parse(localStorage.getItem("token"))
        if (!token) {
            return navigate("/login")

        }
        // dispatch(addProduct(product))

        try {
            const response = await axios.post(
                `/api/v1/onsko/cart/${id}`,
                {}, // body of the request (empty object if there's no body)
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }

            );
            if (response?.data?.success === true) {

                navigate("/cart")
            }
        } catch (error) {
            alert("Something went wrong?try again")
            console.log(error.message)
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
                    <img className="w-6" src="../icon.png" alt="Menu Toggle" />
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
                    {/* <Link to="/cart"><img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png" alt="Profile Icon" /></Link> */}
                </div>
            </nav>




            <div className="div mt-5 lg:flex  ">
                <div className="div w-full lg:w-[50%] lg:h-[100vh]   h-80  rounded-lg flex flex-col  items-center gap-6 p-3 md:h-full md:w-full   ">


                    <div className="div relative flex flex-col flex-shrink-0 w-full h-full   rounded-lg ">
                        <img
                            className='w-full h-full object-cover object-center rounded-md' src=
                            {product?.image} alt="" />
                    </div>


                </div>
                <div className="div w-full lg:w-[50%] lg:p-5  2xl:gap-5   h-auto flex flex-col px-3 md:px-5 xl:gap-5     ">
                    <span className='font-semibold text-2xl md:text-4xl md:mb-2 xl:text-5xl 2xl:text-5xl'>{product?.name}</span>
                    <span className='text-xl md:text-2xl my-2 2xl:text-3xl'>₹{product?.price} </span>


                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    checked={rating === star}
                                    onChange={() => handleRating(star)}
                                    className="hidden"
                                />
                                <span
                                    className={`text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </span>
                            </label>
                        ))}
                    </div>
                    <p className='text-sm mt-2 md:text-lg 2xl:text-xl'>{shortenedText}</p>


                    {/* for tablet only */}
                    <div className="div hidden md:flex w-full   justify-center items-center gap-5">
                        <button onClick={() =>
                            handleDataAdd()
                        } className='w-63  md:w-72 2xl:w-[32rem] 2xl:p-5  p-3 rounded-lg mt-5 2xl:text-2xl bg-orange-500 text-white'>add to cart</button>
                        <button onClick={() => { handleDataAdd() }} className='w-63 border-2 border-black md:w-72 2xl:w-[32rem] 2xl:p-5 2xl:text-2xl  p-3 rounded-lg mt-5   text-black'>buy now</button>
                    </div>
                    {/* for tablet end here */}

                    {/* for mobile */}
                    <button onClick={() => { handleDataAdd() }} className='w-63  md:hidden p-2 rounded-lg mt-5 bg-orange-500 text-white'>add to cart</button>
                    <button onClick={() => { handleDataAdd() }} className='w-63 md:hidden p-2 rounded-lg mt-5 border-2 border-black  text-black'>buy now</button>




                    <div className="div w-full mt-8 border-b-2 border-opacity-[0.2] duration-500 border-black p-1 pb-2   px-2 ">
                        <div className="div flex justify-between  md:p-1 items-center duration-500">
                            <h1 className='text-md md:text-xl'>Product info</h1>
                            {showProductInfo ? <span onClick={() => setProductInfo(prev => !prev)} className=' cursor-pointer text-lg md:text-xl'>- </span> :
                                <span onClick={() => setProductInfo(prev => !prev)} className=' cursor-pointer text-lg md:text-xl'>+</span>
                            }
                        </div>
                        <div className={`${showProductInfo ? "block" : "hidden"} duration-500 div w-full`}>
                            <div className="flex justify-between py-2">

                                <p className='text-xs md:text-lg'>{shortenedText}</p>
                            </div>


                        </div>
                    </div>



                    <div className="div w-full  border-b-2 border-opacity-[0.2] duration-500 border-black p-1 pb-2  mt-2  px-2 ">
                        <div className="div flex justify-between md:p-1 items-center duration-500">
                            <h1 className='text-md md:text-xl'>Return & refund policy</h1>
                            {showreturnPolicy ? <span onClick={() => setreturnPolicy(prev => !prev)} className=' cursor-pointer text-lg md:text-xl'>- </span> :
                                <span onClick={() => setreturnPolicy(prev => !prev)} className=' cursor-pointer text-lg  md:text-xl'>+</span>
                            }
                        </div>
                        <div className={`${showreturnPolicy ? "block" : "hidden"} duration-500 div w-full`}>
                            <div className="flex justify-between py-2">

                                <p className='text-xs md:text-lg'>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
                            </div>










                        </div>
                    </div>
                    <div className="div w-full  border-b-2 border-opacity-[0.2] duration-500 border-black p-1 pb-2  mt-2  px-2 ">
                        <div className="div flex justify-between md:p-1 items-center duration-500">
                            <h1 className='text-md md:text-xl'>Shipping info</h1>
                            {showShippingInfo ? <span onClick={() => setShippingInfo(prev => !prev)} className=' cursor-pointer text-lg md:text-xl'>- </span> :
                                <span onClick={() => setShippingInfo(prev => !prev)} className=' cursor-pointer text-lg  md:text-xl'>+</span>
                            }
                        </div>
                        <div className={`${showShippingInfo ? "block" : "hidden"} duration-500 div w-full`}>
                            <div className="flex justify-between py-2">

                                <p className='text-xs md:text-lg'>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
                            </div>










                        </div>






                    </div>


                </div>

            </div >
            <div className="div hidden lg:hidden xl:flex md:flex mt-10 flex-col  xl:p-5   h-auto">

                {allproduct && <div className='w-full   h-10 flex justify-between items-center px-2 mb-5 xl:mb-3 xl:pl-2 xl:h-10'>
                    <h1 className='  font-bold text-lg md:text-2xl xl:text-3xl'>related items</h1>
                    {/* second top container ends here */}
                </div>}





                <div className="right overflow-y-hidden no-scrollbar o flex md:flex-wrap lg:flex-wrap xl:flex-wrap 2xl:flex-nowrap justify-start items-start py-4 px-5 lg:px-12 w-full 2xl:w-full xl:px-32 2xl:pl-0 2xl:gap-5 gap-2" style={{ maxHeight: '80vh' }}>
                    {
                        allproduct
                            ?.filter(item => item._id !== id) // Filter out the product with the matching ID
                            .map((items, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(`/product/${items?._id}`)}
                                    className="relative flex flex-col flex-shrink-0 w-60 lg:w-72 xl:w-[23rem] 2xl:w-[22.2rem] m-2 transition-transform duration-200 hover:scale-105"
                                >
                                    <div className="absolute top-4 text-xs bg-[#c7dfff] p-1 left-4 text-black lg:top-5 lg:left-5">
                                        Best Seller
                                    </div>
                                    <img
                                        className='w-full h-[60vh] object-cover object-center rounded-md'
                                        src={items?.image}
                                        alt={items?.name}
                                    />
                                    <span className='text-xl font-semibold mt-2'>{items?.name}</span>
                                    <span className='text-lg'><sup>₹</sup>{items?.price}</span>
                                </div>
                            ))
                    }
                </div>



            </div>
            <UserReview />

            <footer className="hidden 2xl:block  text-black py-4">
                <div className="container mx-auto text-center">
                    <div className="mb-2">
                        <a href="/about" className="mx-4 hover:text-yellow-500">About Us</a>
                        <a href="/services" className="mx-4 hover:text-yellow-500">Services</a>
                        <a href="/contact" className="mx-4 hover:text-yellow-500">Contact</a>
                        <a href="/privacy" className="mx-4 hover:text-yellow-500">Privacy Policy</a>
                    </div>
                    <div >
                        <p>&copy; {new Date().getFullYear()} Onsko E-Commerce. All Rights Reserved.</p>
                        <p className='text-orange-600 font-semibold text-xl'>Onsko</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
