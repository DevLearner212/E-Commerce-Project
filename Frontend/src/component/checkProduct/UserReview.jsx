import React, { useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router';
export default function UserReview() {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // Rating (1 to 5 stars)
    const { id } = useParams()
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
            const response = await axios.post(`http://localhost:3000/api/v1/onsko/uploadReview/${id}`, { review })
            if (response.data.sucess == true) {
                alert(" Review Submitted..")
            }

        } catch (error) {
            console.log(error.message);

        }

        // Clear the form
        setReview('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Leave a Review</h2>

            <form onSubmit={handleSubmit}>
                {/* Review Text Area */}
                <div className="mb-4">
                    <label htmlFor="review" className="block text-gray-700 text-sm font-semibold mb-2">Your Review *</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={handleReviewChange}
                        rows="4"
                        className="form-textarea w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        required
                        placeholder="Write your review here..."
                    ></textarea>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}
