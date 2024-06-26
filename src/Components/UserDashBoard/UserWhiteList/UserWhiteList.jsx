
import Rating from "react-rating";

import {  useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Shared/Hooks/useAxiosPublic/useAxiosPublic';

import { useContext } from 'react';
import useWhiteList from './../../Shared/Hooks/useWhiteList/useWhiteList';
import { AuthContext } from "../../AuthProviders/AuthProviders";

const UserWhiteList = () => {
    const [whiteList, refetch,isLoading] = useWhiteList();
    const { user } = useContext(AuthContext);
    const AxiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    const handleAddToCart = async (sale) => {
        if (!user?.email) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please log in to add items to the cart",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
            return;
        }
        try {
            const res = await AxiosPublic.post('/cart', {
                productCode: sale.code,
                name: sale.name,
                image: sale.image,
                price: sale.price,
                discountPrice: sale.discount_price,
                discountPercentage: Math.round(((sale.price - sale.discount_price) / sale.price) * 100),
                details: sale.details,
                seller_email: sale.seller_email,
                customer_email: user?.email,
                productSize: sale.selectedSize, // Ensure this is defined or replace with actual variable
                rating: sale.rating,
                quantity: 1 // Set a default quantity or replace with actual variable
            });
            console.log('Added to cart:', res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Added to cart successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Error: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    const handleRemove = async (_id) => {
      console.log("cart", _id);
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
          if (result.isConfirmed) {
              const res = await AxiosPublic.delete(`whiteList/user/${_id}`);
              console.log(res.data);
              if (res.data.deletedCount) {
                  refetch();
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Deleted Successfully",
                      showConfirmButton: false,
                      timer: 1500
                  });
              }
          }
      });
  };
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner text-error text-9xl"></span>
        </div>
      );
    }

    return (
        <div>
            <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
                My <span className="text-[#FF3811]">White List</span>
            </h2>
            <hr className="my-2" />
            {whiteList.length === 0 ? (
                <p className="text-center mt-10 text-gray-600">Your white list is empty.</p>
            ) : (
                <div className="grid grid-cols-4 gap-10 ml-10 mt-10">
                    {whiteList.map(sale => {
                        const DiscountPercentage = Math.round(((sale.price - sale.discount_price) / sale.price) * 100);
                        return (
                            <div key={sale._id}>
                                <div className="border p-6 w-60 h-96 rounded-lg bg-white hover:border-orange-500 hover:shadow-xl relative">
                                    <div className="absolute top-2 left-2">
                                        <p className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
                                            -{DiscountPercentage}%
                                        </p>
                                    </div>
                                    <div>
                                        <img className="w-40 h-40 mb-2 mx-auto object-scale-down hover:scale-110 transition-all" src={sale.image} alt={sale.name} />
                                        <h3 className="text-base font-semibold mt-3">{sale.name}</h3>
                                        <p className="text-base text-orange-600 ">ট {sale.discount_price}</p>
                                        <div className="flex gap-3">
                                            <p className="text-sm text-gray-600 line-through">ট {sale.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-5">
                                            <Rating
                                                initialRating={sale?.rating}
                                                readonly
                                                emptySymbol={<FaRegStar color="orange" />}
                                                fullSymbol={<FaStar color="orange" />}
                                            />
                                            <span>({sale?.rating})</span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button onClick={() => handleAddToCart(sale)}
                                                className="border py-2 px-2 text-sm font-bold rounded-md border-orange-600 hover:bg-orange-600 hover:shadow-xl hover:text-white">
                                                Add To Cart
                                            </button>
                                            <button onClick={() =>handleRemove (sale?._id)}
                                             className="border py-2 px-2 text-sm font-bold rounded-md border-red-600 hover:bg-red-600 hover:shadow-xl hover:text-white">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UserWhiteList;
