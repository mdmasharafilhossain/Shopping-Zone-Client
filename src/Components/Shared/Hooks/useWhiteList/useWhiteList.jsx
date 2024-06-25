import { useContext } from "react";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const useWhiteList = () => {
    const AxiosPublic = useAxiosPublic();
    const { user} = useContext(AuthContext);
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await AxiosPublic.get(`/whiteList/user/${user?.email}`);
            return res.data;
           
        }
        
    })
    console.log(cart.length)
    return [cart, refetch]
};

export default useWhiteList;