import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
export default function Login() {
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [fullname, setfullname] = useState(null)
    const [profileImage, setprofileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the FileList
        if (file) {
            console.log(file)
            setprofileImage(URL.createObjectURL(file)); // Create a temporary URL for the file
        }
    };

    const HandleSignIn = async (e) => {
        e.preventDefault();
        console.log(fullname)
        console.log(email)
        console.log(password)
        console.log(profileImage)

        try {
            const formData = new FormData();
            formData.append('fullname', fullname); // Add the fullname to FormData
            formData.append('email', email); // Add the email to FormData
            formData.append('password', password); // Add the password to FormData
            formData.append('profileImage', profileImage); // Add the profile image to FormData

            const response = await axios.post("http://localhost:3000/api/v1/onsko/signin", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This is optional; Axios will set it automatically
                },
            });

            console.log(response.data);

            if (response.data?.success === true) {
                setTimeout(() => {
                    navigate("/login");
                }, 300);
            }



        } catch (error) {
            console.log(error);
        }

    }

    return (

        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    <span className="inline-block bg-gray-200 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
                    </span>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
                <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
                <form onSubmit={HandleSignIn}  >
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
                        <input onChange={(e) => setfullname(e.target.value)} type="text" id="fullName" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="James Brown" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                        <input onChange={(e) => setemail(e.target.value)} type="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@alignui.com" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                        <input onChange={(e) => setpassword(e.target.value)} type="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" />
                        <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">Profile Image *</label>
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required />
                        <p className="text-gray-600 text-xs mt-1">Upload a profile picture (optional).</p>
                        {profileImage && (
                            <img src={profileImage} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                        )}
                    </div>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Register</button>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        By clicking Register, you agree to accept Apex Financial's
                        <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>.
                    </p>
                </form>
            </div>
        </div>






    )
}
