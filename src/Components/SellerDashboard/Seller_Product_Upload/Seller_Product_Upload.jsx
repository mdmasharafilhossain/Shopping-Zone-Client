import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Imgae_hosting_key = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`
const Seller_Product_Upload = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const AxiosPublic = useAxiosPublic();
   

    const {  data: AllProducts = [],} = useQuery({
        queryKey: ['AllProducts'],

        queryFn: async () => {
            const res = await AxiosPublic.get('/allProducts')
            console.log(res.data)
            return res.data;

        }

    })
  console.log(user?.email)
    const onSubmit = async (data) => {
        console.log(data);
        const ImageFile = {image:data.image[0]}
        const res = await axiosPublic.post(Imgae_hosting_key,ImageFile,{
        headers: {
            'content-type': 'multipart/form-data'
        }
       });
       console.log(res.data);
       if(res.data.success){
        const ProductsInfo = {
            code:AllProducts.length+1,
            image: res.data.data.display_url,
            name: data.name,
            color: data.color,
            price: parseFloat(data.price),
            discount_price: parseFloat(data.discount_price) || 0,
            seller_email:user?.email,
            rating:4.4,
            size:data.size,
            brand:data.brand || "No Brand",
            warranty:data.warranty || "",
            details:data.details,
            type:data.type,
            category:data.category

        }
        console.log(ProductsInfo);
        const ArticleRes = await axiosPublic.post('/allProducts',ProductsInfo);
        console.log(ArticleRes.data);
        if(ArticleRes.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Added Successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
       }
    
    }
    return (
        <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">Upload <span className='text-[#FF3811]'>Products</span></h2>
            </div>
            
            <div className="mt-10 border-2 mb-10 rounded-md border-orange-500 ml-10">
            

            <div className="px-10 py-10">
                <form className="container mx-auto space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name and COlor */}
                    <div className="flex gap-10">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Name*</span>
                            
                        </div>
                        <input 
                        {...register("name")}
                         type="text" 
                         placeholder="Name Of The Product"  required
                         className="input input-bordered w-full" />
                        
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Color*</span>
                            
                        </div>
                        <input 
                        {...register("color")}
                         type="text" 
                         placeholder="Name Of The Product Color"  required
                         className="input input-bordered w-full" />
                        
                    </label>

                    </div>
                    {/* price */}
                    <div className="flex gap-10">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Price*</span>
                            
                        </div>
                        <input 
                        {...register("price")}
                         type="text" 
                         placeholder="Enter Product Price"  required
                         className="input input-bordered w-full" />
                        
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Discount Price</span>
                            
                        </div>
                        <input 
                        {...register("discount_price")}
                         type="text" 
                         placeholder="If Any discount"  
                         className="input input-bordered w-full" />
                        
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
                         defaultValue={user?.email} readOnly
                         className="input input-bordered w-full" />
                        
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Enter Product Size*</span>
                            
                        </div>
                        <input 
                        {...register("size")}
                         type="text" 
                         placeholder="S,M,XL,XXL ect.."  
                         className="input input-bordered w-full" />
                        
                    </label>

                    </div>
                    {/* Brand And Warrenty */}
                    <div className="flex gap-10">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Brand Name</span>
                            
                        </div>
                        <input 
                        {...register("brand")}
                         type="text" 
                         placeholder="If Any Brand" 
                         className="input input-bordered w-full" />
                        
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Warranty</span>
                            
                        </div>
                        <input 
                        {...register("warranty")}
                         type="text" 
                         placeholder="If Any Warranty"  
                         className="input input-bordered w-full" />
                        
                    </label>

                    </div>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Details Of Your Product*</span>
                            
                        </div>
                        <input 
                        {...register("details")}
                         type="text" 
                         placeholder="Details Of your product"  required
                         className="input input-bordered w-full h-[100px]" />
                        
                    </label>
                    <div className="flex gap-5">
                    <select {...register("type") }
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
                    <div>
                    <input 
                    {...register("image")}
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <input className="btn w-full bg-orange-600 text-white" type="submit" />
                </form>
            </div>
        </div>

        </div>
    );
};

export default Seller_Product_Upload;