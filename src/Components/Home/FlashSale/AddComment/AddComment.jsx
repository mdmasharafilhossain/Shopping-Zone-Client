import { useState } from 'react';

const AddComment = ({InfoCard}) => {
    const [reviews, setReviews] = useState([]);
    const {name} = InfoCard || {}

    return (
        <div className=" mt-10 mx-10 ">
            <div className="border flex justify-between p-2">
                <h1 className="text-xl font-bold">Reviews</h1>
                <button className="border rounded-md hover:bg-orange-500 hover:text-white text-xs p-2">
                    Write a Review
                </button>  
            </div>
            <div className="mt-4">
                {reviews.length === 0 ? (
                    <p>No reviews yet</p>
                ) : (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index} className="border-b py-2">
                                {review}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddComment;
