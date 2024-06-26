
import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProviders/AuthProviders';
import useAxiosSecure from '../Shared/Hooks/useAxiosSecure/useAxiosSecure';

const useSeller = () => {
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const {data:isSeller,isPending: isSellerLoading} = useQuery({
        queryKey:[user?.email, 'isSeller'],
        enabled:!loading && !!user?.email,
        queryFn: async()=>{
            if(user?.email){
                const res = await axiosSecure.get(`/sellers/checkAdmin/${user?.email}`);
            
            return res.data?.admin;
            }
            
        }
    })
    return [isSeller,isSellerLoading]
};

export default useSeller;