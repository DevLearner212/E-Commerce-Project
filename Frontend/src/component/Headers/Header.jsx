import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Header({ value }) {
    const [changeX, setchangeX] = useState(false)
    const navigate = useNavigate()

    const handleCart = () => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/cart")

        } else {

            navigate("/login")
        }
    }
 
    return (
        <nav className="relative cursor-pointer lg:hidden w-[90%]   mx-auto h-10 flex items-center justify-between px-3 rounded-3xl bg-white  lg:mt-8">
            <div className="flex items-center w-40 h-full pr-4  ">
                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                <h1 className="text-2xl ml-2 mb-1 text-green-700 font-semibold">onsko</h1>
            </div>

            <div onClick={() => setchangeX(prev => !prev)} className="w-10 ml-[32%]   h-full flex items-center justify-center md:hidden">
                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/5358/5358649.png" alt="Menu Toggle" />
            </div>
            {/* Mobile Menu */}
            <div className={`absolute   top-0  left-0 w-full h-[20rem] bg-white rounded-l-lg ${changeX ? 'block' : 'hidden'} md:hidden`}>
                <div className="flex items-center justify-between w-full h-10 px-3">
                    <div className="flex items-center w-40 h-full pr-14">
                        <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                        <h1 className="text-2xl text-green-700 font-semibold">onsko</h1>
                    </div>
                    <div onClick={() => setchangeX(prev => !prev)} className="w-10 h-full flex items-center justify-center">
                        <img className="w-5" src="../close.png" alt="Close Menu" />
                    </div>
                </div>
                <div className="w-full h-[85%] p-5 ">
                    <ul className="text-green-700 space-y-4 text-justify cursor-pointer tracking-tighter">
                        <li>Home</li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li>About</li>
                        <li onClick={() => handleCart()}>Wishlist </li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/login">Log</Link></li>
                    </ul>
                </div>
            </div>

            {/* Tablet and Desktop Menu */}
            <div className="hidden md:flex md:w-full md:h-full md:items-center md:pl-14">
                <ul className="flex gap-8 text-green-700">
                    <li>Home</li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li>About</li>
                    <li onClick={() => handleCart()}>Wishlist </li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>
            </div>
            {!value ?
                <div className="hidden md:flex md:w-20 md:h-full md:items-center md:justify-end md:pr-2 ">
                    <Link to="/login"><img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/128/3870/3870822.png" alt="Profile Icon" /></Link>
                </div> :
                <img onClick={() => navigate("/profile", { state: { value: value } })} className="w-6 object-cover 2xl:w-10 2xl:h-10 2xl:object-cover h-6 rounded-full" src={value} alt="Profile Icon" />

            }
        </nav>
    )
}
