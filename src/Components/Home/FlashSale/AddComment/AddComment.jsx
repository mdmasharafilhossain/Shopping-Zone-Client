import { useContext, useState, useEffect } from "react";
import useAxiosPublic from "../../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
const Imgae_hosting_key = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_HOSTING_KEY
}`;

const AddComment = ({ InfoCard }) => {
  const AxiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const { name, code } = InfoCard || {};
  const { user } = useContext(AuthContext);

  const fetchComments = async () => {
    const res = await AxiosPublic.get(`/comment`);
    const filteredComments = res.data.filter(
      (comment) => comment.code === code
    );
    setReviews(filteredComments);
  };

  useEffect(() => {
    fetchComments();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const user_name = user?.displayName || user?.name;
    const customer_rating = rating;
    const review = form.review.value;
    const imageFile = form.image.files[0];
    const formData = new FormData();

    formData.append("image", imageFile);
    const res = await AxiosPublic.post(Imgae_hosting_key, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const photo = res.data.data.display_url;
    const UpdateProducts = {
      name,
      photo,
      customer_rating,
      review,
      code,
      user_name,
    };
    await AxiosPublic.post("/comment", UpdateProducts);
    Swal.fire({
      title: "Done",
      text: "Comment added ",
      icon: "success",
      confirmButtonText: "Ok",
    });
    fetchComments(); 
    e.target.reset();
  };
  

  return (
    <div className="mt-10 mx-10">
      <div>
        <div className="border flex justify-between p-2">
          <h1 className="text-xl font-bold">Reviews</h1>
          <div>
            <button
              className="text-xs p-2 border rounded-md hover:bg-orange-500 hover:text-white"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Write a review
            </button>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h1 className="text-2xl text-orange-500 mb-5">
                    Write a Review
                  </h1>
                  <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                    <div className="form-control w-3/4 md:w-1/2">
                      <label className="label">
                        <span className="label-text">Product Name</span>
                      </label>
                      <label className="input-group">
                        <input
                          type="text"
                          readOnly
                          defaultValue={name}
                          placeholder="Name"
                          name="name"
                          className="input input-bordered w-full outline-none"
                        />
                      </label>
                    </div>
                    <div className="form-control w-3/4 md:w-1/2 mt-3">
                      <label className="label">
                        <span className="label-text mr-40">Rating*</span>
                      </label>
                      <div className="flex space-x-4">
                        <label>
                          <span className="mr-2">Bad</span>
                          <input
                            type="radio"
                            name="rating"
                            value="1"
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value="2"
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value="3"
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value="4"
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value="5"
                            onChange={(e) => setRating(e.target.value)}
                          />
                          <span className="ml-2">Good</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Write Your Review</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        name="review"
                        placeholder="Write Your Review"
                      ></textarea>
                      <div className="label"></div>
                    </label>
                  </div>
                  <div>
                    <input
                      type="file"
                      name="image"
                      className="file-input file-input-ghost w-full max-w-xs"
                    />
                  </div>
                </div>
                <button className="btn border border-orange-500 hover:bg-orange-500 mt-5 ml-[70px] hover:text-white px-32">
                  Submit
                </button>
              </form>
              <div className="modal-action">
                <form method="dialog">
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
                <div className=" items-center">
                  <div>
                    <Rating
                      initialRating={review?.customer_rating}
                      readonly
                      emptySymbol={<FaRegStar color="orange" />}
                      fullSymbol={<FaStar color="orange" />}
                    />
                    <p className="font-bold">{review.user_name}</p>
                    <p>{review.review}</p>
                    <img
                      src={review.photo}
                      alt="Review"
                      className="w-40 h-32"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddComment;
