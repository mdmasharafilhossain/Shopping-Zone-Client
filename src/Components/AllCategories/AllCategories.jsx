import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const AllCategories = () => {
    const { refetch, data: {result : users = [], UsersCount = 0} = {} } = useQuery({
        queryKey: ['users',page],
        enabled:!loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/pagination?page=${page}`);
            
            return res.data;

        }

    })
    return (
        <div className="ml-10">
            <SectionTitle heading={"Categories"}>
                
             </SectionTitle>

        </div>
    );
};

export default AllCategories;