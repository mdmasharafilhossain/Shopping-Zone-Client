import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import AllCategoriesCard from "./AllCategoriesCard/AllCategoriesCard";

const AllCategories = () => {
    const AxiosPublic = useAxiosPublic();
    const { refetch, data: {result : categories = []} = {} } = useQuery({
        queryKey: ['categories'],
        
        queryFn: async () => {
            const res = await AxiosPublic.get("/categories");
            
            return res.data;
            

        }
        

    })

    console.log(categories)
    return (
        <div className="ml-10">
            <SectionTitle heading={"Categories"}>
                
             </SectionTitle>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:border-orange-500  relative">
      {
          categories.map(categorie => <AllCategoriesCard key={categories._id} categorie={categorie} refetch={refetch}></AllCategoriesCard>)
      }
      </div>
        </div>
    );
};

export default AllCategories;