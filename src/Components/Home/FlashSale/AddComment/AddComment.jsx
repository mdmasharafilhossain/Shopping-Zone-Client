import { useRef, useState } from 'react';

const AddComment = ({InfoCard}) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const formRef = useRef(null);
    const {name,code} = InfoCard || {}
    
    
    
    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        
        const name = form.name.value;
        const photo = form.image.value;
        const customer_rating = rating;
        const review = form.rating.value;
        
        const UpdateProducts = {name,photo,customer_rating,review,code}
        console.log(UpdateProducts);
        

        
        //   axiosSecure.put(`/users/profile/${user.email}`,UpdateProducts)
        //   .then(res=>{
        //     console.log(res.data);
        //     if(res.data.modifiedCount > 0){
        //         refetch();
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: `Update Successfully`,
        //             showConfirmButton: false,
        //             timer: 1500
        //           });
        //     }
        //  })
     e.target.reset();
    }
    return (
        <div className=" mt-10 mx-10 ">
            <div >
                <div className="border flex justify-between p-2">
                <h1 className="text-xl font-bold">Reviews</h1>
                <div>
                <button className="text-xs p-2 border rounded-md hover:bg-orange-500 hover:text-white" onClick={() => document.getElementById('my_modal_1').showModal()}>Write a review</button> 
                </div>
                <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                        <form onSubmit={handleSubmit}>
                        <div className=" space-y-4">
                            <h1 className='text-2xl text-orange-500 mb-5 '>Write a Review</h1>
                            {/* Name and Rating div */}
                        <div className='flex flex-col md:flex-row lg:flex-row gap-5'>
                        <div className="form-control w-3/4 md:w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <label className="input-group ">

                                <input type="text"  readOnly defaultValue={name} placeholder="Name" name="name" className="input input-bordered w-full  outline-none" />
                            </label>
                        </div>
                        {/* Rating div */}
                        <div className="form-control w-3/4 md:w-1/2 mt-3">
                            <label className="label ">
                                <span className="label-text mr-40">Rating*</span>
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
                {/* Text Area  */}
                <div>
                <label className="form-control">
  <div className="label">
    <span className="label-text">Write Your Review</span>
   
  </div>
  <textarea className="textarea textarea-bordered h-24" name="rating" placeholder="Write Your Review"></textarea>
  <div className="label">
    
  </div>
</label>
                </div>
                {/* File input */}
                <div>
                    
                <input type="file" name="image" className="file-input file-input-ghost w-full max-w-xs" />
                </div>
                        
                    </div>
                    <button className="btn mt-5 ml-48">Submit</button>
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
