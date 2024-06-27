import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const SpecificCategory = () => {
    const CardsInfo = useLoaderData();
    const AxiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { category } = useParams();
    console.log("category", category);

    const { data: AllProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/allProducts');
            console.log(res.data);
            return res.data;
        }
    });

    // Filter products based on the category
    const filteredProducts = AllProducts.filter(product => product.category === category);

    return (
        <div>
            <h1>Products in Category: {category}</h1>
            {isLoading ? (
                      <div className="flex justify-center items-center min-h-screen">
                      <span className="loading loading-spinner text-error text-9xl"></span>
                    </div>
              
            ) : (
                <div>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SpecificCategory;
