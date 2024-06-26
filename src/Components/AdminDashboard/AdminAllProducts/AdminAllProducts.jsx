import { useContext } from "react";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { FaStar, FaRegStar } from 'react-icons/fa';

import { CgDetailsMore } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const AdminAllProducts = () => {
    const AxiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const {  data: AllProducts = [], isLoading,refetch} = useQuery({
        queryKey: ['AllProducts'],

        queryFn: async () => {
            const res = await AxiosPublic.get('/allProducts')
            console.log(res.data)
            return res.data;

        }

    })
  console.log(user?.email)

//   Remove functionality 
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
            const res = await AxiosPublic.delete(`allProducts/user/${_id}`);
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
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">All <span className='text-[#FF3811]'>Products</span></h2>
            </div>

            <div className="grid grid-cols-5 gap-10 ml-10">
            {AllProducts.map(sale => {
            const DiscountPercentage = Math.round(((sale.price - sale.discount_price) / sale.price) * 100);
            return (
              <div key={sale._id}>
                
                  <div className="flex">
                    <div className="border p-6 w-60 h-96 rounded-lg bg-white hover:border-orange-500 hover:shadow-xl relative">
                      <div className="absolute top-2 left-2">
                        <p className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
                          -{DiscountPercentage}%
                        </p>
                      </div>
                      
                      {/* Cart Image, Text Div */}
                      <div>
                      <img className="w-40 h-40 mb-2 mx-auto object-scale-down  hover:scale-110 transition-all" src={sale.image} alt={sale.name} />
                      <h3 className="text-base font-semibold mt-3">{sale.name}</h3>
                      <p className="text-base text-orange-600 ">ট {sale.discount_price}</p>
                      <div className="flex gap-3">
                        <p className="text-sm text-gray-600 line-through">ট {sale.price}</p>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-3 mt-5">
                        
                        <Rating
                            initialRating={sale?.rating}
                            readonly
                            emptySymbol={<FaRegStar color="orange" />}
                            fullSymbol={<FaStar color="orange" />}
                        />
                        <span className="">({sale?.rating})</span>
                    </div>
                    {/* Button */}
                    <div className="flex gap-2 mt-2">
                                           <Link to={`/AdminDashboard/product/${sale._id}`}>
                                           <button 
                                                className="border flex py-2 px-3 text-sm font-bold rounded-md border-orange-600 hover:bg-orange-600 hover:shadow-xl hover:text-white">
                                               <CgDetailsMore className="mt-1"/> Details
                                            </button>
                                           </Link>
                                            <button onClick={() =>handleRemove (sale?._id)}
                                             className="border flex py-2 px-3 text-sm font-bold rounded-md border-red-600 hover:bg-red-600 hover:shadow-xl hover:text-white">
                                                <MdDelete className="mt-1"/> Remove
                                            </button>
                                        </div>

                      </div>
                     
                    </div>
                  </div>
                
              </div>
            );
          })}
            </div>
      
        </div>
    );
};

export default AdminAllProducts;