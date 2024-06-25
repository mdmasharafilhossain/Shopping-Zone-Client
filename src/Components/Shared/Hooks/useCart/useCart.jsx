import { useContext } from "react";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
    const AxiosPublic = useAxiosPublic();
    const { user} = useContext(AuthContext);
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await AxiosPublic.get(`/cart?email=${user.email}`);
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;