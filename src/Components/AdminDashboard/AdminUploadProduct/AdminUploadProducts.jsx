import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";


const Imgae_hosting_key = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`
const AdminUploadProducts = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
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
        const articleInfo = {
            image: res.data.data.display_url,
            name: data.name,
            color: data.color,
            price: data.price,
            discount_price: data.discount_price || 0,
            seller_email:user?.email,
            rating:4.4,
            size:data.size,
            status:'pending'

        }
        // console.log(articleInfo);
        const ArticleRes = await axiosPublic.post('/article',articleInfo);
        console.log(ArticleRes.data);
        if(ArticleRes.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Article Added Successfully",
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
            
            <div className="mt-32 border ml-10">
            

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
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Description</span>
                            
                        </div>
                        <input 
                        {...register("description")}
                         type="text" 
                         placeholder="Description Of The Article Title"  required
                         className="input input-bordered w-full " />
                        
                    </label>
                    <div className="flex gap-5">
                    <select {...register("tag")}
                        className="select select-bordered w-full ">
                        <option disabled selected>Select Tag</option>
                        <option value="War">War</option>
                        <option value="Nature">Nature</option>
                        <option value="Technology">Technology</option>
                        <option value="Sports">Sports</option>

                    </select>
                    <select {...register("publisher")}
                        className="select select-bordered w-full ">
                        <option disabled selected>Select Publisher</option>
                        <option value="BBC">BBC</option>
                        <option value="CNN">CNN</option>
                        <option value="Aljajira">Aljajira</option>
                        <option value="NDTV">NDTV</option>

                    </select>
                    </div>
                    <div>
                    <input 
                    {...register("image")}
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <input className="btn w-full bg-red-600 text-white" type="submit" />
                </form>
            </div>
        </div>

        </div>
    );
};

export default AdminUploadProducts;