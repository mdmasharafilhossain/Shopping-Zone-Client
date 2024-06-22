import { useState } from 'react';

const AddComment = ({InfoCard}) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const {name,image} = InfoCard || {}

    return (
        <div className=" mt-10 mx-10 ">
            <div className="border flex justify-between p-2">
                <h1 className="text-xl font-bold">Reviews</h1>
                <div>
                <button className="text-xs p-2 border rounded-md hover:bg-orange-500 hover:text-white" onClick={() => document.getElementById('my_modal_1').showModal()}>Write a review</button> 
                <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                        <form onSubmit="{hadndleUpdate}">
                        <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                        <div className="form-control w-3/4 md:w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <label className="input-group">

                                <input type="text" readOnly defaultValue={name} placeholder="Name" name="name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        {/* Rating div */}
                        <div className="form-control w-3/4 md:w-1/2">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <div className="flex space-x-4">
            <label>
            <span className="mr-2">Bad</span>
              <input type="radio" name="rating" value="1" onChange={(e) => setRating(e.target.value)} />
              
            </label>
            <label>
              <input type="radio" name="rating" value="2" onChange={(e) => setRating(e.target.value)} />
              
            </label>
            <label>
              <input type="radio" name="rating" value="3" onChange={(e) => setRating(e.target.value)} />
             
            </label>
            <label>
              <input type="radio" name="rating" value="4" onChange={(e) => setRating(e.target.value)} />
              
            </label>
            <label>
              <input type="radio" name="rating" value="5" onChange={(e) => setRating(e.target.value)} />
              <span className="ml-2">Good</span>
            </label>
          </div>
                        </div>
                        
                    </div>
                    <button className="btn mt-5 ml-48">Update</button>
                        </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
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
