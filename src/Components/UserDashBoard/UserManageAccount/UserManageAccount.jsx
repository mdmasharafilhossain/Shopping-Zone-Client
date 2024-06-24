import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";


const UserManageAccount = () => {
    const AxiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const {  data: users = [], isLoading} = useQuery({
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
                    
                    <div className="border rounded-lg mt-10 px-10 py-10 bg-slate-100">
                   <div className="grid grid-cols-3 text-center">
                   <h1 className="text-lg">Full Name: <br></br><span className="font-bold">{customer.name}</span></h1>
                   <h1 className="text-lg">Email: <br></br><span className="font-bold">{customer.email}</span></h1>
                   <h1 className="text-lg">Mobile: <br></br><span className="font-bold">{customer.number || "Not Set"}</span></h1>
                   </div>
                   <div className="grid grid-cols-3 text-center mt-20">
                   <h1 className="text-lg">Current Location: <br></br><span className="font-bold">{customer.address || "Not Set"}</span></h1>
                   <h1 className="text-lg">Gender: <br></br><span className="font-bold">{customer.gender || "Not Set"}</span></h1>
                   <h1 className="text-lg">Date of birth: <br></br><span className="font-bold">{customer.birthday_date || "Not Set"}</span></h1>
                   </div>
                 
                    </div>
                  

                </div>)
               }
            </div>
        </div>
    );
};

export default UserManageAccount;