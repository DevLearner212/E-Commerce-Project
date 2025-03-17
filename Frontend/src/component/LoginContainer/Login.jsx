import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import e from 'cors';
import Swal from 'sweetalert2';


export default function Login() {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
 
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate()
    const storeToken = (token) => {
        const now = new Date().getTime(); // Current time
        const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day expiration

        // Store token and expiration time in localStorage
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('tokenExpiration', expirationTime.toString());
    };

    const userlogin = async (e) => {
        validateForm();
        try {
            const response = await axios.post("/api/v1/onsko/login", { email, password });
    
            if (response.data?.success === true && response.data?.token) {
                const token = response?.data?.token;
                storeToken(token);
    
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back! Redirecting to your dashboard...',
                    timer: 2000,
                    showConfirmButton: false,
                });
    
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.data?.message || 'Invalid credentials. Please try again.',
                });
            }
        } catch (error) {
            console.error(error.message);
    
            let errorMessage = 'Something went wrong. Please try again later.';
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const status = error.response.status;
                if (status === 400) {
                    errorMessage = 'Bad request. Please check your inputs.';
                } else if (status === 401) {
                    errorMessage = 'Unauthorized. Invalid email or password.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your network.';
            }
    
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: errorMessage,
            });
        }
    };


    const validateForm = () => {
        const emailIsValid = /\S+@\S+\.\S+/.test(email);

        if (!email && !password) {
            setErrorMessage("Email and password are required");
            setEmailError(true);
            setPasswordError(true);
            clearError();
            return;
        }
        if (!email) {
            setErrorMessage("Email can't be empty");
            setEmailError(true);
            clearError();
            return;
        }
        if (!password) {
            setErrorMessage("Password can't be empty");
            setPasswordError(true);
            clearError();
            return;
        }
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters");
            setPasswordError(true);
            clearError();
            return;
        }
        if (!emailIsValid) {
            setErrorMessage("Invalid email format");
            setEmailError(true);
            clearError();
            return;
        }
        
        // If everything is valid
        setErrorMessage("");
        setEmailError(false);
        setPasswordError(false);
    };

    const clearError = () => {
        setTimeout(() => {
            setErrorMessage('');
            setEmailError(false);
            setPasswordError(false);
        }, 2000);
    };









    return (
        <> 
 <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img 
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png" 
              alt="Logo" 
              className="w-32 mx-auto" 
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow focus:outline-none focus:shadow-sm">
                  <div className="bg-white p-2 rounded-full">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" 
                      alt="Google" 
                      className="w-4" 
                    />
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow focus:outline-none focus:shadow-sm mt-5">
                  <div className="bg-white p-1 rounded-full">
                    <img 
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                      alt="GitHub" 
                      className="w-6" 
                    />
                  </div>
                  <span className="ml-4">Sign Up with GitHub</span>
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input  onChange={(e)=>setemail(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
                  type="email" 
                  placeholder="Email" 
                />
                <input  onChange={(e)=>setpassword(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" 
                  type="password" 
                  placeholder="Password" 
                />
                <button onClick={userlogin} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:shadow-outline">
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                You dont have an account ? <span className=' cursor-pointer underline font-semibold' onClick={()=>navigate("/sign")}>please sign Up</span> 
       
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div 
            className="m-12 xl:m-16 w-full bg-cover  bg-center bg-no-repeat" 
            style={{ backgroundImage: 'url(https://cdn.wallpapersafari.com/42/55/JE3wDB.png)' }}
          ></div>
        </div>
      </div>
    </div>

        </>

    )
}
