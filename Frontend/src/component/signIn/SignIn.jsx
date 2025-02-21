import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [errormessage, seterrormessage] = useState('')

    const navigate = useNavigate()
    const storeToken = (token) => {
        const now = new Date().getTime(); // Current time
        const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day expiration

        // Store token and expiration time in localStorage
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('tokenExpiration', expirationTime.toString());
    };

    const userlogin = async (e) => {
        validateForm()
        try {
            console.log(email, password)
            const response = await axios.post("http://localhost:3000/api/v1/onsko/login", { email, password })


            if (response.data?.success === true && response.data?.token) {
                const token = response?.data?.token
                storeToken(token);

                setTimeout(() => {
                    navigate("/")
                }, 300)
            } else {

            }

        } catch (error) {
            console.log(error.message);

        }
    }


    const validateForm = () => {
        const email = document.body.querySelector("#emailInput")
        const password = document.body.querySelector("#passwordInput")
        const emailIsValid = /\S+@\S+\.\S+/.test(email.value);


        if (email.value.length <= 0 && password.value.length <= 0) {
            email.style.border = "2px solid red"
            password.style.border = "2px solid red"
            seterrormessage("email and password is required");
            setTimeout(() => {
                seterrormessage("");
                email.style.border = "1px solid black"
                password.style.border = "1px solid black"

            }, 2000)
            return;

        }
        else if (email.value.length <= 0) {
            email.style.border = "2px solid red"
            // password.style.border = "2px solid red"
            seterrormessage("email is can't be empty");
            return;
        }
        else if (password.value.length <= 0) {

            password.style.border = "2px solid red"
            // password.style.border = "2px solid red"
            seterrormessage("password  can't be empty");
            setTimeout(() => {
                password.style.border = "1px solid black"

                seterrormessage(" ");
            }, 2000)
            return;
        }
        if (password.value.length <= 8) {
            seterrormessage("Must required 8 character");
            setTimeout(() => {
                password.style.border = "1px solid black"

                seterrormessage(" ");
            }, 2000)
            return;

        }
        if (!emailIsValid) {
            seterrormessage("Email is invalid");
            setTimeout(() => {
                email.style.border = "1px solid black"

                seterrormessage(" ");
            }, 2000)
            return;
        }


    }










    return (
        <>
            <div className="vh-100   rounded-lg">
                <div className="container mx-auto py-5 h-full">
                    <div className="flex   justify-center items-center h-[39rem]">

                        <div className="bg-white shadow-2xl w- rounded-lg  h-full flex">
                            <div className="w-full h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1695527081756-6e15ed27c6a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww"
                                    alt="login form"
                                    className=" rounded-l-lg h-full object-cover"
                                />
                            </div>
                            <div className="flex items-center w-full p-6 h-full">
                                <div className="">
                                    <div className="flex items-center mb-3">

                                        <span className="text-3xl font-bold">Login to <span className='text-orange-600'>Onsko</span></span>
                                    </div>
                                    <h5 className="text-lg font-normal mb-3" style={{ letterSpacing: '1px' }}>
                                        Sign into your account
                                    </h5>

                                    <div className="mb-4">
                                        <input
                                            onChange={(e) => setemail(e.target.value)}

                                            type="email"


                                            className="block w-full p-2 border border-gray-300 rounded"
                                            id="emailInput"
                                            placeholder="Email address"
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <input
                                            onChange={(e) => setpassword(e.target.value)}
                                            type="password"


                                            className="block w-full p-2 border border-gray-300 rounded"
                                            id="passwordInput"
                                            placeholder="Password"
                                        />
                                        {errormessage && <p className='text-red-600'>{errormessage}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            onClick={userlogin}
                                            className="bg-black text-white w-full py-2 rounded"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <a className="text-gray-500" href="#!">Forgot password?</a>
                                    <p className="mb-5">
                                        Don't have an account? <span onClick={() => navigate("/sign")} className="text-[#393f81] cursor-pointer">Register here</span>
                                    </p>


                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </div >





        </>

    )
}
