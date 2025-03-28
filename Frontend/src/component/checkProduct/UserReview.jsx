import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router';
export default function UserReview() {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // Rating (1 to 5 stars)
    const { id } = useParams()
    const [userDetail,setUserDetail] = useState([])
    const handleReviewChange = (e) => {
         
        
        setReview(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (review.trim() === '') {
            alert('Please enter a review and select a rating.');
            return;
        }

        try {
            const response = await axios.post(`/api/v1/onsko/uploadReview/${id}`, { review })    
            if (response.data.success == true) {
                setReview();
                getReview()
            }

        } catch (error) {
            console.log(error.message);

        }

        // Clear the form
      
    };

    const getReview = async()=>{
        try {
            const response = await axios.get(`/api/v1/onsko/getUserReview/${id}`)
            if(response.data.success == true)
                {
                setUserDetail(response.data?.data)

            }
 
            
        } catch (error) {
                console.log(error.message);
                
        }
    }
    useEffect(()=>{
        getReview()
    },[])   
    return (
  <>
  <section className="  text-black   py-8 lg:py-16 antialiased">
  <div className="max-w-2xl   px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold   text-black">Discussion </h2>
    </div>
    <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4  bg-white rounded-lg rounded-t-lg border border-gray-800    ">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows={6} onChange={handleReviewChange}
                className="px-0 w-full text-sm   border-0 focus:ring-0 focus:outline-none  text-black  placeholder-gray-800  "
                placeholder="Write a comment..." required />
        </div>
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-900">
            Post comment
        </button>
    </form>
    {userDetail?.map((items,index)=>{
       return  <article key={index} className="p-6 text-base  my-5 bg-white rounded-lg dark:bg-gray-900">
         <footer className="flex justify-between items-center mb-2">
             <div className="flex items-center">
                 <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                         className="mr-2 w-6 h-6 rounded-full"
                         src={items?.user?.profilePic}
                         alt="Michael Gough" />{items?.user?.name}</p>
                 <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate="true" dateTime="2022-02-08"
                         title="February 8th, 2022">Feb. 8, 2022</time></p>
             </div>
             <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                 className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                 type="button">
                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                     <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                 </svg>
                 <span className="sr-only">Comment settings</span>
             </button>
             {/* Dropdown menu */}
             <div id="dropdownComment1"
                 className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                 <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                     aria-labelledby="dropdownMenuIconHorizontalButton">
                     <li>
                         <div
                             className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</div>
                     </li>
                     <li>
                         <div
                             className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</div>
                     </li>
                     <li>
                         <div
                             className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</div>
                     </li>
                 </ul>
             </div>
         </footer>
         <p className="text-gray-500 dark:text-gray-400">{items?.review?.comment}</p>
         <div className="flex items-center mt-4 space-x-4">
             <button type="button"
                 className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                 <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                 </svg>
                 Reply
             </button>
         </div>
     </article>
    })}
  </div>
</section>
  </>
    );
}
