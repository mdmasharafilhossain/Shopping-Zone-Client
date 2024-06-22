import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import Sale_Banner from "../../../../assets/sale bannwr.png";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

const AllFlashSale = () => {
  const AxiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState("");

  const {
    refetch,
    data: { result: Flashsales = [] } = {},
    isLoading,
  } = useQuery({
    queryKey: ["Flashsales", sortOrder],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/flashSale?sort=${sortOrder}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    refetch();
  };

  return (
    <div>
      <img className="w-full h-32" src={Sale_Banner} alt="Sale" />
      <div className="flex gap-2 justify-end mr-40">
        <div>
          <p className="text-lg  mt-1">Sort by:</p>
        </div>
        
        <select
          className="select select-bordered select-sm rounded-md w-48 mt-1 max-w-xs"
          onChange={handleSort}
          value={sortOrder}
        >
          <option value="" disabled selected>
            Default
          </option>
          <option value="lowToHigh">Low price to high price</option>
          <option value="highToLow">High price to Low price</option>
        </select>
      </div>

      {/* Main Div */}
      <div className="flex gap-10">
        {/* Filter div */}
        <div>
          <h1>gjvk</h1>
        </div>

        {/* Cart div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-32">
          {Flashsales?.map((sale) => {
            const DiscountPercentage = Math.round(
              ((sale.price - sale.discount_price) / sale.price) * 100
            );
            return (
              <div
                key={sale?._id}
                className="border p-6 w-60 h-80 rounded-lg bg-white hover:border-orange-500 hover:shadow-xl relative"
              >
                <div className="absolute top-2 left-2">
                  <p className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
                    -{DiscountPercentage}%
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button className="text-orange-500 hover:text-orange-700">
                    <AiOutlineHeart size={24} />
                  </button>
                </div>
                <Link to={`sale/${sale._id}`}>
                  <div>
                    <img
                      className="w-40 h-40 mb-2 mx-auto object-scale-down hover:scale-110 transition-all"
                      src={sale.image}
                      alt={sale.name}
                    />
                    <h3 className="text-base font-semibold mt-3">
                      {sale.name}
                    </h3>
                    <p className="text-base text-orange-600">
                      ট {sale.discount_price}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-sm text-gray-600 line-through">
                        ট {sale.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllFlashSale;
