import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
export default function Cart() {

    const [changeX, setchangeX] = useState(false)
    const [products, setproduct] = useState([])
    const [totalprice, setTotalprice] = useState()
    const [id, setorderId] = useState()
    const [cancel, setcancel] = useState(false)
    const navigate = useNavigate()


    const getcart = useCallback(async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await axios.get("/api/v1/onsko/getcart", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            setproduct(response?.data?.cart)
            setorderId(response?.data?.cart?._id)
            setTotalprice(response?.data?.finalPrice)

        } catch (error) {
            if (error.response.status === 404) {
                console.log("Handled")
            }
            console.log("hi")
        }
    }, [])


    const updateCount = useCallback(async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {

                await axios.post(`/api/v1/onsko/cart/${id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                setTimeout(() => {
                    navigate(0)

                }, 200)


            }
            else {
                navigate("/sigin")
            }
        } catch (error) {
            console.log(error.message)
        }


    }, []);
    const removeItems = useCallback(async (id) => {
        try {
            setorderId(id)
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {

                await axios.get(`/api/v1/onsko/removecart/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                setTimeout(() => {
                    navigate(0)

                }, 200)


            }
            else {
                navigate("/sigin")
            }
        } catch (error) {
            console.log(error.message)
        }


    }, [navigate]);

    useEffect(() => {
        getcart()


    }, [getcart])

    const removeCart = async () => {
        const token = JSON.parse(localStorage.getItem("token"));

        try {
            const response = await axios.post("/api/v1/onsko/removeallcart", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response?.data?.success == true) {
                setproduct([])

                navigate("/shop")
                // navigate(0)
            }


        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 404) {
                    navigate("/shop")
                } else {
                    alert("An error occurred: " + error.response.data.message);
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                alert("Something went wrong, please check the console.");
            }

        }
    };






































    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51QGeC3GCVUDiMIBNMrWBdBHjkdue4GbyS253iReEhDTga2V8okh4EfTWanB6glRjCZ6ceaWfaQz47AsP2OYA3t4Q00gBp3d4Ns")



        const headers = {
            "Content-Type": "application/json"
        }

        const response = await axios.post(`/api/v1/onsko/create-checkout-session`, { products }, {
            headers: headers,
        })

        const result = stripe.redirectToCheckout({ sessionId: response.data.id })
        if (result.error) {
            console.log(result.error)
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
                            <img className="w-5" src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" alt="Close Menu" />
                        </div>
                    </div>
                    {/* for mobile */}
                    <div className="w-full h-[85%] p-5 ]">
                        <ul className="text-white space-y-4 text-justify cursor-pointer tracking-tighter">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li>About</li>
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


            </nav>
















            <div className="div w-full h-auto relative ">
                {cancel == true && < div className="div   shadow-2xl border-[1px] border-black border-dashed cursor-pointer  absolute z-[999] right-0 left-[30rem]  p-10 gap-10 w-[30vw] h-[60vh] rounded-xl flex flex-col items-center justify-center bg-white">
                    <div className="div w-full flex justify-center items-center  ">
                        <h1 className='text-2xl'>Payment Methods</h1>
                        <button onClick={() => setcancel(prev => !prev)} className='pl-32'><img className='w-4' src="https://cdn-icons-png.flaticon.com/128/1828/1828665.png" alt="" /></button>
                    </div>

                    <div onClick={makePayment} className="div w-full cursor-pointer  hover:bg-indigo-400 hover:text-white h-20 rounded-lg bg-gray-200 flex justify-center items-center gap-5">
                        <img className='w-20' src="https://cdn-icons-png.flaticon.com/128/5968/5968382.png" alt="" />
                        <h1 className='text-xl'>Pay via Stripe</h1>
                    </div>
                    <p className='text-sm'><span className='text-indigo-400'>Complete Your Transaction : </span>  Choose a Payment Method</p>
                </div>}
                <div className="div w-full border-b-[1px] border-opacity-[0.2] border-black mt-5 h-16 xl:h-24 flex justify-start items-center px-2 xl:hidden">
                    <h1 className='text-lg font-medium lg:text-2xl '>My cart</h1>
                </div>

                {/* items boxes are store here only the items boxes*/}

                {products?.length < 1 && <div className='xl:hidden flex justify-center items-center my-20 font-semibold text-sm md:text-xl'><h1>No items are added here yet.</h1></div>}

                {products?.map((items, i) => {

                    return <div key={i} className="div w-full  border-opacity-[0.3]  mt-5 h-40 lg:h-60  flex border-b-[1px] xl:hidden ">
                        {/* left container */}
                        <div className="left w-[6rem]  pb-10  md:w-40 md:pb-0    h-full flex justify-center items-center  lg:w-60">
                            <img className='w-20 md:w-32 lg:w-48 lg:rounded-md' src={items?.image} alt="" />
                        </div>
                        {/* Right container */}
                        <div className="right flex flex-col w-[20rem]   md:w-[40rem]   lg:w-[48.5rem] ">
                            {/* top box in right container */}
                            <div className="top w-full  h-16  flex justify-between items-start   ">
                                <h1 className='w-40 h-full pl-2 mt-3 text-sm md:text-lg  md:mt-0 md:w-80 md:pt-2 lg:text-3xl   lg:w-[40rem] lg:pt-3'>{items?.name}</h1>
                                <button onClick={() => removeItems(items?._id)}>
                                    <img className='w-4 mt-4 ml-4 md:w-5 md:mt-1 md:mr-1 lg:w-7 lg:mt-2' src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="" />
                                </button>
                            </div>
                            {/* middle box in right container */}
                            <div className="div pl-2 flex items-center w-full  h-8   lg:h-14 ">
                                <span className='text-sm md:text-md lg:text-xl'>₹{items?.price}</span>
                            </div>
                            {/* bottom box in right container */}
                            {items.count === items.stock && <span className='text-xs text-red-600 my-2 ml-2'>No stock left</span>}
                            <div className="div w-full  h-10 flex justify-between items-center  md:h-14 px-2  lg:h-32">
                                <div className='w-20 h-8 border-[1px] border-opacity-[0.3] flex justify-between px-2 items-center border-black lg:w-32 lg:h-12 lg:rounded-md lg:px-5'>
                                    <button
                                        onClick={() => {
                                            if (items.count > 1) {

                                                handleDecrease(i)


                                            }
                                        }}
                                        className='text-xl lg:text-3xl'>-</button>
                                    <span className='lg:text-2xl'>{items?.count}</span>
                                    <button
                                        onClick={() => {
                                            if (items.count < items.stock) {

                                                handleIncrease(i)
                                            }
                                        }}

                                        className='text-xl lg:text-3xl'>+</button>
                                </div>

                                <span className='lg:text-2xl'>₹{items?.price * items?.quantity}</span>

                            </div>
                        </div>


                    </div>

                })}
                <div className="div w-full border-b-[1px] border-opacity-[0.3] flex flex-col gap-2 justify-center  border-black h-24 md:h-32 lg:h-40 lg:gap-4 xl:hidden  ">
                    <div className="div w-full flex  justify-start items-center gap-3">
                        <img className='w-5 md:w-7 lg:w-10 lg:ml-5' src="https://img.icons8.com/?size=30&id=60661&format=png" alt="" />
                        <h1 className=' tracking-tighter md:text-lg cursor-pointer lg:text-2xl'>enter a  promo code</h1>
                    </div>
                    <div className="div w-full flex  justify-start items-center gap-3">
                        <img className='w-5 md:w-7 lg:w-10 lg:ml-5' src="https://img.icons8.com/?size=30&id=59849&format=png" alt="" />
                        <h1 className=' tracking-tighter md:text-lg cursor-pointer lg:text-2xl'>add notes</h1>
                    </div>
                </div>





                <div className="div w-full  flex mt-5 border-b-[1px] border-opacity-[0.3]  h-32 md:h-40 lg:h-52 xl:hidden   ">
                    {/* left  */}
                    <div className="left w-[20rem]   flex flex-col justify-center items-start   md:w-[40rem]   lg:w-[57rem]">
                        <dl className=' flex flex-col gap-2 md:pl-12 md:gap-4 md:text-lg md:font-medium lg:text-2xl lg:gap-8'>
                            <dt className='' >Subtotal</dt>
                            <dt>Delivery</dt>
                            <dt className='underline'>Rajasthan,jaipur</dt>
                        </dl>
                    </div>
                    <div className="right w-[5rem]  flex flex-col justify-start pt-5 items-end md:">
                        <dl className=' flex flex-col gap-2 md:gap-4 md:text-lg lg:text-xl lg:gap-8'>
                            <dt>₹{totalprice}</dt>
                            <dt >Free</dt>
                            {/* <dt className='underline'>Rajasthan,jaipur</dt> */}
                        </dl>
                    </div>
                </div>





                <div className='w-full  flex flex-col justify-between pb-2 items-start h-32  xl:hidden '>
                    <div className=' w-full h-16 flex justify-between items-center lg:px-10 '>
                        <h1 className='text-xl md:text-3xl md:font-semibold md:tracking-wide'>Total</h1>
                        <span className='text-2xl lg:text-3xl lg:font-semibold'>₹{totalprice}</span>
                    </div>

                    <button className='w-72 mx-auto  p-2 rounded-lg bg-[linear-gradient(10deg,red,orange)]  text-white md:w-[30rem] lg:w-[35rem] lg:p-3 lg:text-xl'>Buy</button>
                </div>
                <div className="div w-full  mt-1 h-5 flex justify-center items-center xl:hidden ">
                    <img className='w-4' src="https://img.icons8.com/?size=30&id=100837&format=png" alt="" />
                    <span className='text-md font-semibold'>Secure Checkout</span>
                </div>
            </div >















            {/* for laptop pc an all upto responsiveness */}



            < div className="hidden xl:flex div w-full   mt-5 h-full  " >
                <div className="left w-[70%]     p-6">

                    <div className="div w-full border-b-2 border-opacity-[0.4] border-black  h-20 flex justify-between items-center px-2 ">
                        <h1 className='text-lg font-medium  '>My cart</h1>
                        <button onClick={() => removeCart()} className='p-1  underline rounded-lg text-sm mt-3 text-red-600'>Clear all </button>
                    </div>

                    {/* items container start from here */}

                    {totalprice === 0 &&
                        <>
                            < div className='flex justify-center items-center mt-52 font-semibold text-xl'><h1>No items are added here yet.</h1></div>
                        </>
                    }



                    {products?.map((item, i) => {



                        return <div key={i} className="div w-full border-opacity-[0.3] mt-2 h-32 flex border-b-[1px]">
                            <div className="left w-32 flex justify-center items-center h-full">
                                <img className='w-24 lg:rounded-md' src={item?.image} alt="" />
                            </div>

                            <div className="div w-full flex flex-col">
                                <div className="top w-full h-12 flex justify-between items-start">
                                    <h1 className='w-40 h-full pl-2 mt-3 text-sm md:text-lg md:mt-0 md:w-80 md:pt-2 xl:text-lg lg:w-[40rem] lg:pt-3'>
                                        {item.name}
                                    </h1>
                                </div>
                                <div className="div pl-2 flex items-center w-full h-8">
                                    <span className='text-sm'>₹{item?.price}</span>
                                </div>

                                {item.quantity === item.stock && <span className='text-xs text-red-600 my-2 ml-2'>No stock left</span>}

                                <div className="div w-full h-10 flex justify-between items-center md:h-14 px-2 lg:h-32">
                                    <div className={`w-20 h-8 border-2 border-opacity-[0.3] flex justify-between px-2 items-center ${item.quantity === item.stock && "border-red-600"} border-black lg:w-20 lg:rounded-md`}>
                                        <button onClick={() => {

                                            // updateCount(i, item.count - 1);
                                            removeItems(item?._id)
                                            // console.log("count increase")

                                        }} className='text-xl'>-</button>
                                        <span>{item?.quantity}</span>
                                        <button onClick={() => {
                                            if (item?.quantity != item?.stock) {


                                                updateCount(item?._id)
                                            }

                                        }} className='text-xl'>+</button>
                                    </div>

                                    <span className='text-lg'>₹{item?.price * item?.quantity}</span>
                                </div>
                            </div>
                        </div>
                    })}








































                </div>



                {/* right container start from here */}

                <div className=" h-full w-[30%] py-10">
                    <div className="w-96   p-8 rounded-lg">
                        <h2 className="text-lg font-semibold">Order summary</h2>

                        <div className="mt-8 space-y-8">
                            <div className="flex justify-between ">
                                <span>Subtotal</span>
                                <span className='text-lg '>₹{totalprice ? totalprice : "0"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimate Delivery</span>
                                <span>-</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span className='text-lg '>₹{totalprice ? totalprice : "0"}</span>
                            </div>
                        </div>

                        <button onClick={() => setcancel(prev => !prev)} className="mt-6 w-full py-2 bg-red-400 text-white font-bold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                            Checkout
                        </button>



                        <div className="mt-4 flex justify-center items-center text-gray-600 text-sm">
                            <img className='w-5 h-5 mr-1' src="https://img.icons8.com/?size=30&id=100837&format=png" alt="" />
                            <span className='text-md font-semibold'>Secure Checkout</span>
                        </div>

                    </div>


                </div>

            </div >









        </>
    )
}
