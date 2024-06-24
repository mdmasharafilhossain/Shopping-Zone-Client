import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";


const UserManageAccount = () => {
    const AxiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

  const {
    refetch,
    data: { result: users = [] } = {},
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/profile/${user?.email}`);
      return res.data;
    },
  });
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
               
            </div>
        </div>
    );
};

export default UserManageAccount;