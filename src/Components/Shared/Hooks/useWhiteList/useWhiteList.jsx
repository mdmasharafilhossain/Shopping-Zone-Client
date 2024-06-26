import { useContext } from "react";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const useWhiteList = () => {
    const AxiosPublic = useAxiosPublic();
    const { user} = useContext(AuthContext);
    const { refetch, data: whiteList = [],isLoading } = useQuery({
        queryKey: ['whiteList', user?.email],
        queryFn: async() => {
            const res = await AxiosPublic.get(`/whiteList/user/${user?.email}`);
            return res.data;
           
        }
        
    })
    console.log(whiteList.length)
    return [whiteList, refetch,isLoading]
};

export default useWhiteList;