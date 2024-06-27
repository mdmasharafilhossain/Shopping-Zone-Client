import { useContext } from "react";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
    const AxiosPublic = useAxiosPublic();
    const { user} = useContext(AuthContext);
    const { refetch, data: cart = [],isLoading } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await AxiosPublic.get(`/cart/user/${user?.email}`);
            return res.data;
           
        }
        
    })
   
    return [cart, refetch,isLoading]
};

export default useCart;