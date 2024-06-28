import { useContext } from "react";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const AdminAllOrder = () => {
    const Axiossecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: Allpayments = [] } = useQuery({
        queryKey: ['Allpayments', user?.email],
        queryFn: async () => {
            const res = await Axiossecure.get("/payments");
            return res.data;
        },
        enabled: !!user?.email, 
    });
    return (
        <div>
            <h1>kkkk</h1>
        </div>
    );
};

export default AdminAllOrder;