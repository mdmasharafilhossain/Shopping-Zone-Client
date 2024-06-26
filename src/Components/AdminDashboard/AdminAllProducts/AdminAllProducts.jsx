import { useContext } from "react";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const AdminAllProducts = () => {
    const AxiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const {  data: AllProducts = [], isLoading} = useQuery({
        queryKey: ['AllProducts'],

        queryFn: async () => {
            const res = await AxiosPublic.get('/allProducts')
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
        <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">All <span className='text-[#FF3811]'>Products</span></h2>
               
            </div>
      
        </div>
    );
};

export default AdminAllProducts;