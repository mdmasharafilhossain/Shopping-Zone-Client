
import { useContext } from 'react';
import { AuthContext } from '../../Comonents/AuthProvider/AuthProvider';
import UseAxiosSecure from './../../Comonents/Hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    
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