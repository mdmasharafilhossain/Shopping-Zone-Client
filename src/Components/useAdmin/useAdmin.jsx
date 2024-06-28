
import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProviders/AuthProviders';
import useAxiosSecure from '../Shared/Hooks/useAxiosSecure/useAxiosSecure';

const useAdmin = () => {
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const {data:isUserAdmin} = useQuery({
        queryKey:[user?.email, 'isUserAdmin'],
        enabled:!loading && !!user?.email,
        queryFn: async()=>{
            if(user?.email){
                const res = await axiosSecure.get(`/users/checkAdmin/${user?.email}`);
            
            return res.data?.admin;
            }
            
        }
    })
    return [isUserAdmin]
};

export default useAdmin;