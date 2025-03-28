import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    const removeAccount = async () => {
        try {
            const response = await axios.post("/api/v1/onsko/logout");
    
            if (response.status === 200 && response.data?.success) {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                
                // Show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been successfully logged out.',
                    timer: 2000,
                    showConfirmButton: false
                });
                
                // Redirect to home
                navigate("/login");
                return;
            }
    
            // Handle API success=false cases
            throw new Error(response.data?.message || "Logout operation failed");
    
        } catch (error) {
            let errorTitle = "Error";
            let errorMessage = "An unexpected error occurred. Please try again.";
            let icon = 'error';
    
            if (error.response) {
                // Server responded with error status
                switch (error.response.status) {
                    case 401:
                        errorTitle = "Session Expired";
                        errorMessage = "Your session has expired. Please login again.";
                        icon = 'warning';
                        break;
                    case 403:
                        errorTitle = "Access Denied";
                        errorMessage = "You don't have permission to perform this action.";
                        break;
                    case 500:
                        errorTitle = "Server Error";
                        errorMessage = "Our servers are experiencing issues. Please try again later.";
                        break;
                    default:
                        errorMessage = error.response.data?.message || 
                                      `Request failed with status code ${error.response.status}`;
                }
            } else if (error.request) {
                // No response received
                errorTitle = "Network Error";
                errorMessage = "Unable to connect to the server. Please check your internet connection.";
            }
    
            console.error("Logout error:", error);
    
            // Show error alert
            await Swal.fire({
                icon,
                title: errorTitle,
                text: errorMessage,
                confirmButtonColor: '#3085d6',
            });
    
            // Force logout if authentication error
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                navigate("/login");
            }
        }
    };
    return (
        <>
            <div>
                <div className="div w-full h-60 flex flex-col items-center gap-2 ">

                    <img className='mx-auto object-cover mb-2 w-32 h-32 rounded-full' src={userProfileImage} alt="" />
                    <h1 className='text-center text-xl font-semibold'>Dev Kumar saini</h1>
                    <p className='text-center text-xs tracking-tighter font-medium'> devsaini27806@gmail.com</p>
                    <button
                        onClick={removeAccount}

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
