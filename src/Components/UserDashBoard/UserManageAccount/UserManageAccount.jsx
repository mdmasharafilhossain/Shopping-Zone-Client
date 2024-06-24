import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";


const UserManageAccount = () => {
    const AxiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const { refetch, data: users = [], isLoading} = useQuery({
        queryKey: ['users'],

        queryFn: async () => {
            const res = await AxiosPublic.get(`/users/profile/${user.email}`);
            console.log(res.data)
            return res.data;

        }

    })
  console.log(user?.email)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error text-9xl"></span>
      </div>
    );
  }
    return (
        <div className="ml-5">
            <h2 className='text-center font-bold mt-6 text-2xl md:text-4xl'>
         My<span className='text-[#FF3811]'> Profile </span>
      </h2>
      <hr className='my-2' />
      {/* Profile */}
            <div>
               {
                users?.map(customer=><div key={customer._id}>
                    
                    <div className="border px-10 py-10 bg-slate-100">
                   <div className="flex justify-between">
                   <h1 className="text-lg">Full Name: <br></br><span className="font-bold">{customer.name}</span></h1>
                   <h1 className="text-lg">Email: <br></br><span className="font-bold">{customer.email}</span></h1>
                   <h1 className="text-lg">Mobile: <br></br><span className="font-bold">{customer.phone || "Not Set"}</span></h1>
                   </div>
                   <div className="flex lg:gap-[450px] mt-20">
                   <h1 className="text-lg">Current Location: <br></br><span className="font-bold">{customer.location || "Not Set"}</span></h1>
                   <h1 className="text-lg">Gender: <br></br><span className="font-bold">{customer.phone || "Not Set"}</span></h1>
                   </div>
                   <button
          type='submit'
          className='group relative my-2 h-10 w-full overflow-hidden bg-white text-base shadow-md rounded-full'
        >
          <div className='absolute inset-0 w-1/12 bg-[#FF3811] transition-all duration-[300ms] ease-out group-hover:w-full'></div>
          <span className='relative group-hover:text-white text-black uppercase font-semibold tracking-wider'>
            Edit Profile
          </span>
        </button>
                    </div>
                  

                </div>)
               }
            </div>
        </div>
    );
};

export default UserManageAccount;