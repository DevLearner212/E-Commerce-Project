import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ArrowBigDown, ArrowDown } from 'lucide-react';
import Header from '../Headers/Header';
export default function AddBlogs() {
    const navigate = useNavigate()
    const [imageSrc, setImageSrc] = useState("/public/Big/itemsIcons.png");
    const [headlines, setheadlines] = useState();
    const [bio, setbio] = useState();
    const [ImageFile, setImageFile] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('headlines', headlines);
            formData.append('bio', bio);
            if (ImageFile) {
                formData.append('ImageFile', ImageFile);
            }

            const response = await axios.post("/api/v1/onsko/blogs", formData)
            if (response.data?.success == true) {
                navigate("/blog")
            }
        } catch (error) {
            console.log(error.message)

        }
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file); // Store t
        }
    };

    return (
        <>
 
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Share Your Experience
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Upload your experience related to the product you purchased. We value your feedback and want to hear about your journey!
                    </p>
                    <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center relative">
                        <span className='flex justify-center items-center mb-1'>Click on Bag <ArrowDown/> </span>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <img
                            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded cursor-pointer"
                            alt="hero"
                            src={imageSrc} 
                          
                            onClick={handleImageClick}
                        />
                        <div className="flex w-full justify-center items-end">
                            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">
                                    Name
                                </label>
                                <input
                                    onChange={(e) => setheadlines(e.target.value)}
                                    type="text"
                                    id="hero-field"
                                    name="hero-field"
                                    placeholder='Enter the product Name'
                                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col mt-5 items-center">
                            <form onSubmit={handleSubmit} className="mb-4 w-full md:w-2/3">
                                <textarea
                                    value={bio}
                                    onChange={(e) => setbio(e.target.value)}
                                    placeholder="Enter your feedback..."
                                    cols="100"
                                    className="w-full h-52 bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-2 px-3 mb-4"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 focus:outline-none"
                                >
                                    Submit Feedback
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
