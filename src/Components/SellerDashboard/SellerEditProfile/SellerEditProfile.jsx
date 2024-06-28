import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const SellerEditProfile = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {  data: EditSeller = [],isLoading} = useQuery({
     queryKey: ['EditUsers',user?.email],

    queryFn: async () => {
        const res = await AxiosPublic.get(`/sellers/profile/${user?.email}`);
        console.log(res.data)
        return res.data;

    }

})

  const onSubmit = async (data) => {
    const SellersInfo = {
      name: data?.name,
      number: data.number,
      address: data.address,
      email: user?.email,
      Bank_Account_Number:data?.bank
    };
    console.log(SellersInfo)
    const UsersDetails = await AxiosPublic.patch('/sellers', SellersInfo);
    console.log("Database: ",UsersDetails.data)
     if (UsersDetails.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No Change",
            showConfirmButton: false,
            timer: 1500
          });
    }
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
      <h2 className='text-center font-bold mt-6 text-2xl md:text-4xl'>
         Edit <span className='text-[#FF3811]'>Profile</span>
      </h2>
      <hr className='my-2' />

      <div className="ml-10">
        {
            EditSeller.map(user=><form key={user._id}
                onSubmit={handleSubmit(onSubmit)}
                className='border container mx-auto my-10 rounded-3xl'
              >
                <div className='flex flex-col px-3 sm:px-6 md:px-16 lg:px-20 py-8 sm:py-12'>
                  <div className='flex flex-col w-full my-2'>
                    <label className='text-sm md:text-lg'>Your Name*</label>
                    <input
                      type='text'
                      defaultValue={user?.name}
                      readOnly
                      placeholder='Title'
                      className='text-lg w-full outline-none border px-2 py-1'
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span className='text-red-500'>Name is required!</span>}
                  </div>
                  <div className='flex flex-col w-full my-2'>
                    <label className="text-sm md:text-lg">Your Email*</label>
                    <input
                      type='text'
                      placeholder='Subtitle'
                      defaultValue={user?.email}
                      readOnly
                      className='text-lg outline-none border px-2 py-1'
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span className='text-red-500'>Email is required!</span>}
                  </div>
                  <div className='flex flex-col w-full my-2'>
                    <label className='text-sm md:text-lg'>Mobile Number*</label>
                    <input
                      type='text'
                      defaultValue={user?.number || "Not set"}
                      required
                      placeholder='Enter your mobile number'
                      className='text-lg w-full outline-none border px-2 py-1'
                      {...register("number", { required: true })}
                    />
                    {errors.number && <span className='text-red-500'>Mobile number is required!</span>}
                  </div>
                  <div className='flex flex-col w-full my-2'>
                    <label className="text-sm md:text-lg">Your Current Address*</label>
                    <textarea
                      type='text'
                      defaultValue={user?.address || "Not Set"}
                      required
                      placeholder='Your Current Address'
                      className='text-lg outline-none border px-2 py-1 resize-none'
                      {...register("address", { required: true, maxLength: 5000 })}
                    />
                    {errors.address && <span className='text-red-500'>Address is required!</span>}
                  </div>
                  <div className='flex flex-col w-full my-2'>
                    <label className='text-sm md:text-lg'>Bank Number*</label>
                    <input
                      type='text'
                      defaultValue={user?.Bank_Account_Number || "Not set"}
                      required
                      placeholder='Enter your mobile number'
                      className='text-lg w-full outline-none border px-2 py-1'
                      {...register("bank", { required: true })}
                    />
                    {errors.number && <span className='text-red-500'>Mobile number is required!</span>}
                  </div>
                 
      
                  <button
                    type='submit'
                    className='group relative my-2 h-10 w-full overflow-hidden bg-white text-base shadow-md rounded-full'
                  >
                    <div className='absolute inset-0 w-1/12 bg-[#FF3811] transition-all duration-[300ms] ease-out group-hover:w-full'></div>
                    <span className='relative group-hover:text-white text-black uppercase font-semibold tracking-wider'>
                      Update Profile
                    </span>
                  </button>
                </div>
              </form>)
        }
      </div>
    </div>
  );
};

export default SellerEditProfile;
