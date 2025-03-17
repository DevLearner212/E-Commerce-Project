import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
export default function AdminPanel() {
    const navigate = useNavigate();
    const [imageSRC, setImageSrc] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setname] = useState(null);
    const [description, setdescription] = useState(null);
    const [price, setprice] = useState(null);
    const [category, setcategory] = useState(null);
    const [stock, setstock] = useState(1);

    const handleFileChange = (e) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
            setImage(file); // Store t
        }
    };

    const [selectedOptions, setSelectedOptions] = useState({
        debit: false,
        credit: false,
        upi: false,
        cash: false,
    });

    const handleChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prevState => ({
            ...prevState,
            [value]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name); // Add the Blob to FormData
            formData.append('description', description); // Add the Blob to FormData
            formData.append('price', price); // Add the Blob to FormData
            formData.append('stock', stock); // Add the Blob to FormData
            formData.append('image', image); // Add the Blob to FormData
            formData.append('category', category); // Add the Blob to FormData

            const response = await axios.post("/api/v1/onsko/productadd", formData)
            if (response.data.success == true) {
                navigate("/shop")
            }
            console.log(response?.data)
        } catch (error) {
            console.log(error.message)

        }

        // Add logic for handling payment confirmation here
    };
    return (
        <div className="div flex items-center justify-center h-screen">

            <div className=" bg-orange-600 h-[95%]   w-1/5 rounded-lg text-white p-6">
                <div className="top rounded-lg flex-col w-full gap-2 h-44 flex justify-center items-center">
                    <img className="w-12" src="https://cdn-icons-png.flaticon.com/128/346/346167.png" alt="Logo" />
                    <h1 className="text-5xl text-white font-semibold">onsko</h1>
                    <p className='text-sm tracking-tighter font-semibold text-white'>Admin Panel</p>
                </div>
                <nav>
                    <ul className='flex flex-col justify-center gap-7 cursor-pointer'>
                        <li onClick={() => navigate("/")} className='bg-white text-black p-2 rounded-lg flex items-center justify-between pr-24'>
                            <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/609/609803.png" alt="" />
                            Home
                        </li>
                        <li onClick={() => navigate("/panel/dashboard")} className='bg-white text-black p-2 rounded-lg flex items-center justify-between pr-24'>
                            <img className='w-5' src="https://cdn-icons-png.flaticon.com/128/610/610106.png" alt="" />
                            Dashboard
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
            <div className="right w-[80%] h-full">
                <div className="div gap-5 p-2 h-full flex">
                    <div className="left w-[70%] rounded-lg p-2 flex flex-col">
                        <div className="bg-white p-6 shadow-2xl rounded-lg flex-1">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">Hi Dev Kumar Saini👋</h2>
                                <img src="https://cdn-icons-png.flaticon.com/128/16557/16557354.png" className="w-8 cursor-pointer" />
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <h3 className="text-lg font-semibold mb-4">Product Overview</h3>
                                <span className="text-sm text-white bg-green-500 p-2 rounded-full">Active</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-medium">Title</label>
                                    <input onChange={(e) => setname(e.target.value)} type="text" className="w-full p-2   rounded-md border-2 border-black outline-none" placeholder="Pattern Clarifying Shampoo" />
                                </div>

                                <div>
                                    <label className="block font-medium">Description</label>
                                    <textarea onChange={(e) => setdescription(e.target.value)} className="w-full p-2 border rounded-md" />
                                </div>

                                <div className="flex space-x-4">
                                    <div>
                                        <label className="block font-medium">Price</label>
                                        <input onChange={(e) => setprice(e.target.value)} type="text" className="w-full p-2 border rounded-md" placeholder="USD 2.00" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium">Media</label>
                                    <div className="relative border-dashed border-2 p-6 text-center rounded-md">
                                        {!imageSRC ? <p className="mb-4">Add files or drop files to upload</p> : null}
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                        <button
                                            className="bg-gray-100 p-2 rounded-md"
                                            onClick={() => document.querySelector('input[type="file"]').click()}
                                        >
                                            {!imageSRC ? "Add files" : "Change Image"}
                                        </button>
                                        {imageSRC && (
                                            <div className="mt-4 flex justify-center items-center relative">
                                                <img src={imageSRC} alt="Preview" className="max-w-full h-80 rounded-md" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-center gap-5">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Upload</button>
                                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">Clear all</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="right w-[30%] rounded-lg flex flex-col p-2 gap-2">
                        <div className="w-80 bg-white p-6 shadow-md rounded-lg">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Product Stock</h3>
                                <select onChange={(e) => {
                                    setstock(e.target.value);
                                }} className="w-full p-2 border rounded-md">
                                    {[...Array(100).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Color</h3>
                                <div className="flex">
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Category</h3>
                                <div className="mt-2 space-x-3 cursor-pointer">
                                    <span onClick={() => setcategory("hair")} className={`inline-block ${category == "hair" ? "bg-orange-500 text-white" : " bg-gray-200"} px-2 py-1 text-sm rounded-md mr-2`}>Hair</span>
                                    <span onClick={() => setcategory("face")} className={`inline-block bg-gray-200 ${category == "face" ? "bg-orange-500 text-white" : " bg-gray-200"} px-2 py-1 text-sm rounded-md`}>Face</span>
                                    <span onClick={() => setcategory("body")} className={`inline-block bg-gray-200 ${category == "body" ? "bg-orange-500 text-white" : " bg-gray-200"} px-2 py-1 text-sm rounded-md mr-2`}>Body</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
                                <form>
                                    <div className="flex flex-col space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                value="debit"
                                                checked={selectedOptions.debit}
                                                onChange={handleChange}
                                            />
                                            Debit Card
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                value="credit"
                                                checked={selectedOptions.credit}
                                                onChange={handleChange}
                                            />
                                            Credit Card
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                value="upi"
                                                checked={selectedOptions.upi}
                                                onChange={handleChange}
                                            />
                                            UPI
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                value="cash"
                                                checked={selectedOptions.cash}
                                                onChange={handleChange}
                                            />
                                            Cash
                                        </label>
                                    </div>
                                    <button type="submit" className="text-blue-600 text-sm mt-2 block">
                                        Confirm Payment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
