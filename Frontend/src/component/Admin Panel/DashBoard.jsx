import React, { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
export default function DashBoard() {
    const navigate = useNavigate();
    const [products, setproduct] = useState([])
    const [showproductOveriew, setproductOverview] = useState()
    const [showproductList, setshowProductList] = useState(false)
    const [showProduct, setshowProduct] = useState(false)

    const getAllproducts = useCallback(async () => {
        try {
            const response = await axios.get("/api/v1/onsko/getAllproducts")


            setproduct(response.data)

        } catch (error) {
            console.log(error.message)
        }
    }, [])
    const getproductbyId = async (id) => {
        try {
            setshowProduct(true)
            setshowProductList(prev => !prev)
            const response = await axios.get(`/api/v1/onsko/getProductById/${id}`)

            console.log(response.data)
            setproductOverview(response.data)



        } catch (error) {
            console.log(error.message);

        }
    }
    useEffect(() => {
        getAllproducts()
    }, [])
    return (
        <>
            <div className="flex h-screen overflow-hidden relative ">
                <div className={`div  ${showproductList == true ? "flex" : "hidden"} overflow-scroll  flex-col items-center  justify-start   w-full absolute  bg-white rounded-md h-full `}>
                    <div className="div w-full  flex justify-center items-center">
                        <h1 className='text-xl mt-2'>Choose your product</h1>
                        <button
                            className="close-button text-2xl absolute right-4"
                            onClick={() => {/* Add close functionality here */ }}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="right    mt-10  flex flex-wrap justify-between items-start py-8 px-5 lg:px-12   w-[80%] xl:px-32 2xl:px-0 2xl:gap-5  gap-1    ">
                        {products.map((items, i) => {

                            return <div key={i} onClick={() => { getproductbyId(items?._id) }} className="div relative flex   flex-col flex-shrink-0 w-60 lg:w-72 xl:w-[23rem] ">

                                <div className="div absolute top-4 text-xs bg-[#c7dfff] p-1 left-4 text-black lg:top-5 lg:left-5">
                                    Best Seller
                                </div>
                                <img
                                    className='w-full h-[60vh] object-cover object-center rounded-md' src=
                                    {items?.image} alt="" />
                                <span className='text-xl'>{items?.name}</span>
                                <span><sup>₹</sup>{items?.price}</span>
                            </div>
                        })}


                    </div>
                </div>



                {/* Main Content */}
                <div className="w-64 bg-orange-600 h-[97%] rounded-lg text-white p-6">
                    <h1 className="text-2xl font-bold mb-8">Onsko Seller Central</h1>
                    <nav>
                        <ul className='flex flex-col justify-center gap-7 cursor-pointer'>
                            <li onClick={() => navigate("/panel")} className='bg-white text-black p-2 rounded-lg flex items-center justify-between pr-24'>
                                <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/3703/3703259.png" alt="" />
                                Products
                            </li>
                            <li onClick={() => navigate("/profile")} className='bg-white text-black p-2 rounded-lg flex items-center justify-between pr-24'>
                                <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/7829/7829198.png" alt="" />
                                Team
                            </li>


                            <li className='bg-white text-black p-2 rounded-lg flex items-center justify-between pr-24'>
                                <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/9715/9715468.png" alt="" />
                                Reviews
                            </li>
                        </ul>


                    </nav>
                </div>

                <div className="flex-1 p-6">
                    <div className="space-y-6">
                        {/* Overview Section */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <div className="flex items-center gap-2">
                                    <img src="https://cdn-icons-png.flaticon.com/128/6744/6744989.png" alt="" className=" w-5" />
                                    <h2 className="text-lg font-bold">Total Views</h2>
                                </div>
                                <p className="text-2xl">0</p>
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <div className="flex items-center gap-2">
                                    <img src="https://cdn-icons-png.flaticon.com/128/8781/8781861.png" alt="" className=" w-5" />
                                    <h2 className="text-lg font-bold">Products sold</h2>
                                </div>
                                <p className="text-2xl">0</p>
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <div className="flex items-center gap-2">
                                    <img src="https://cdn-icons-png.flaticon.com/128/3594/3594449.png" alt="" className=" w-5" />
                                    <h2 className="text-lg font-bold">Total Income</h2>
                                </div>
                                <p className="text-2xl">0</p>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white p-6  h-[50vh] rounded-md shadow-md overflow-hidden">
                            <div className="w-full flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Product Details</h2>
                                <h2 onClick={() => setshowProductList(prev => !prev)} className="text-sm underline text-red-600 cursor-pointer">
                                    Show more
                                </h2>
                            </div>

                            {showProduct === false ? (
                                <div className='flex justify-center items-center h-full'>
                                    No product selected yet...
                                </div>
                            ) : (
                                <div className={`flex space-x-4  h-full`}>
                                    <img
                                        src={showproductOveriew?.image}
                                        alt="Product"
                                        className="w-[40vh]  h-[40vh] object-cover rounded-md"
                                    />
                                    <div className="flex flex-col  justify-between">
                                        <div className='gap-5'>
                                            <h3 className="text-xl font-bold">{showproductOveriew?.name}</h3>
                                            <p className="text-lg">Category: {showproductOveriew?.category}</p>
                                            <p className="text-lg">List Price: ${showproductOveriew?.price}</p>
                                            <p className="text-lg">Discount: 8%</p>
                                            <p className='line-clamp-2 text-base'>Highlight: {showproductOveriew?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>






                    </div>
                </div>











                <div className="w-80 space-y-6">
                    {/* Sales Potential Overview */}
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Stock  Overview</h3>
                        <div className="div w-full h-20   flex flex-col justify-center items-center">
                            <span className='text-5xl'>{showproductOveriew?.stock}</span>
                            <span>{showproductOveriew ? "Items are Left" : "0"}</span>
                        </div>
                    </div>

                    {/* Product Performance */}
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Rating Overview</h3>
                        <div className="div flex items-center justify-center gap-2">
                            <p>{showproductOveriew?.rating}</p>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                alt="Product Performance Graph"
                                className="w-3"
                            />
                        </div>
                    </div>

                    {/* Keywords */}

                </div>
            </div >
        </>
    )
}
