import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProviders";

import { useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";

const SellerEditProduct = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const CardsInfo = useLoaderData();
    const { id } = useParams();
    const AllProducts = CardsInfo?.find((brand) => brand._id === id);
    const DiscountPercentage = Math.round(((AllProducts?.price - AllProducts?.discount_price) / AllProducts?.price) * 100);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: AllProducts?.name || '',
            color: AllProducts?.color || '',
            price: AllProducts?.price || '',
            discount_price: AllProducts?.discount_price || '',
            email: user?.email || '',
            size: AllProducts?.size || '',
            brand: AllProducts?.brand || '',
            warranty: AllProducts?.warranty || '',
            details: AllProducts?.details || '',
            type: AllProducts?.type || '',
            category: AllProducts?.category || '',
            Offer_coupon: AllProducts?.Offer_coupon || '',
            Offer_Percentage:AllProducts?.Offer_Percentage || '',
        }
    });

    const onSubmit = async (data) => {
        const parseFloatOrZero = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));

        const ProductsInfo = {
            code: AllProducts.length + 1,
            name: data.name,
            color: data.color,
            price: parseFloatOrZero(data.price),
            discount_price: parseFloatOrZero(data.discount_price),
            seller_email: user?.email,
            rating: 4.4,
            size: data.size,
            brand: data.brand || "No Brand",
            warranty: data.warranty || "",
            details: data.details,
            type: data.type,
            category: data.category,
            Offer_coupon: data.Offer_coupon,
            Offer_Percentage: parseFloatOrZero(data?.Offer_Percentage) 
        };

        console.log("Info", ProductsInfo);
        const ArticleRes = await axiosPublic.patch(`/allProducts/editseller/${id}`, ProductsInfo);
        if (ArticleRes.data.modifiedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">Edit <span className='text-[#FF3811]'>Products</span></h2>
            </div>
            
            <div className="mt-10 border-2 mb-10 rounded-md border-orange-500 ml-10">
                <div className="px-10 py-10">
                    <form className="container mx-auto space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name and Color */}
                        <div className="flex gap-10">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Product Name*</span>
                                </div>
                                <input 
                                    {...register("name")}
                                    type="text" 
                                    placeholder="Name Of The Product"  
                                    required
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Product Color*</span>
                                </div>
                                <input 
                                    {...register("color")}
                                    type="text" 
                                    placeholder="Name Of The Product Color"  
                                    required
                                    className="input input-bordered w-full" 
                                />
                            </label>
                        </div>
                        {/* Price */}
                        <div className="flex gap-10">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Product Price*</span>
                                </div>
                                <input 
                                    {...register("price")}
                                    type="text" 
                                    placeholder="Enter Product Price"  
                                    required
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Product Discount Price</span>
                                </div>
                                <input 
                                    {...register("discount_price")}
                                    type="text" 
                                    placeholder="If Any discount"  
                                    className="input input-bordered w-full" 
                                />
                            </label>
                        </div>
                        {/* Email */}
                        <div className="flex gap-10">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Your Email</span>
                                </div>
                                <input 
                                    {...register("email")}
                                    type="text" 
                                    defaultValue={user?.email} 
                                    readOnly
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Enter Product Size*</span>
                                </div>
                                <input 
                                    {...register("size")}
                                    type="text" 
                                    placeholder="S,M,XL,XXL etc.."  
                                    className="input input-bordered w-full" 
                                />
                            </label>
                        </div>
                        {/* Brand and Warranty */}
                        <div className="flex gap-10">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Brand Name</span>
                                </div>
                                <input 
                                    {...register("brand")}
                                    type="text" 
                                    placeholder="If Any Brand" 
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Warranty</span>
                                </div>
                                <input 
                                    {...register("warranty")}
                                    type="text" 
                                    placeholder="If Any Warranty"  
                                    className="input input-bordered w-full" 
                                />
                            </label>
                        </div>
                        {/* Details */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Details Of Your Product*</span>
                            </div>
                            <input 
                                {...register("details")}
                                type="text" 
                                placeholder="Details Of your product"  
                                required
                                className="input input-bordered w-full h-[100px]" 
                            />
                        </label>
                        {/* Type and Category */}
                        <div className="flex gap-5">
                            <select {...register("type")}
                                className="select select-bordered w-full ">
                                <option disabled selected>Select Type*</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Accessories">Home Accessories</option>
                                <option value="Others">Others</option>
                            </select>
                            <select {...register("category")}
                                className="select select-bordered w-full ">
                                <option disabled selected>Select Category*</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Caps">Caps</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Fan">Fan</option>
                            </select>
                        </div>
                        {/* Offer Coupon */}
                        <div className="flex gap-5">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Offer Coupon</span>
                            </div>
                            <input 
                                {...register("Offer_coupon")}
                                type="text" 
                                placeholder="Enter Offer Coupon"  
                                className="input input-bordered w-full" 
                            />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Offer Percentage</span>
                            </div>
                            <input 
                                {...register("Offer_Percentage")}
                                type="text" 
                                placeholder="Enter Offer Coupon"  
                                className="input input-bordered w-full" 
                            />
                        </label>

                        </div>
                        <input className="btn w-full bg-orange-600 text-white" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerEditProduct;
