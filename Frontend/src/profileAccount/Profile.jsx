import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
export default function Profile() {
    const navigate = useNavigate()
    const location = useLocation();
    const userProfileImage = location.state?.value; // Safely access the state value
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [navigate])
    const removeAccound = async () => {
        try {
            const response = await axios.post("/api/logout")

            if (response.data?.success == true) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                navigate("/")
            }

        } catch (error) {
            console.log(error.message)

        }
    }
    return (
        <>
            <div>
                <div className="div w-full h-60 flex flex-col items-center gap-2 ">

                    <img className='mx-auto object-cover mb-2 w-32 h-32 rounded-full' src={userProfileImage} alt="" />
                    <h1 className='text-center text-xl font-semibold'>Dev Kumar saini</h1>
                    <p className='text-center text-xs tracking-tighter font-medium'> devsaini27806@gmail.com</p>
                    <button
                        onClick={removeAccound}

                        className="bg-red-500 text-white font-semibold py-1 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
                <div className="grid   p-8 mt-10 gap-4 w-full h-full
                grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  
  <div className="bg-gray-200 w-full sm:w-60 md:w-72 h-60 p-4 rounded shadow flex flex-col gap-5 items-center justify-center">
    <img src="https://cdn-icons-png.flaticon.com/128/5530/5530389.png" alt="Your Orders" />
    <h1>Your Orders History</h1>
  </div>

  <div onClick={() => navigate("/cart")} className="bg-gray-200 w-full sm:w-60 md:w-72 h-60 p-4 rounded shadow flex flex-col gap-5 items-center justify-center">
    <img src="https://cdn-icons-png.flaticon.com/128/5735/5735325.png" alt="Your Wishlist" />
    <h1>Your Wishlist</h1>
  </div>

  <div onClick={() => navigate("/subscription")} className="bg-gray-200 w-full sm:w-60 md:w-72 h-60 p-4 rounded shadow flex flex-col gap-5 items-center justify-center">
    <img src="https://cdn-icons-png.flaticon.com/128/5836/5836060.png" alt="Your Subscription" />
    <h1>Your Subscription</h1>
  </div>

  <div onClick={() => navigate("/blogpost")} className="bg-gray-200 w-full sm:w-60 md:w-72 h-60 p-4 rounded shadow flex flex-col gap-5 items-center justify-center">
    <img src="https://cdn-icons-png.flaticon.com/128/3959/3959542.png" alt="Feedback" />
    <h1>Write your Feedback</h1>
  </div>

</div>

            </div>
        </>
    )
}
