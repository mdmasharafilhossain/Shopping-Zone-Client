import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import Sale_Banner from "../../../../assets/sale bannwr.png";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

const AllFlashSale = () => {
  const AxiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const {
    refetch,
    data: { result: Flashsales = [] } = {},
    isLoading,
  } = useQuery({
    queryKey: ["Flashsales", sortOrder, selectedColor],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/flashSale?sort=${sortOrder}&color=${selectedColor}`);
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

  const handleBrandChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    refetch();
  };

  const colors = ["white", "pink", "Rose Gold", "Blue", "Green", "Yellow"];
  const types = ["Men","Women","Kids"]

  return (
    <div>
      <img className="w-full h-32" src={Sale_Banner} alt="Sale" />
      <div className="flex gap-2 justify-end mr-40">
        <div>
          <p className="text-lg mt-1">Sort by:</p>
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

      {/* Filter Component */}
      

      {/* Main Div */}
      <div className="flex justify-evenly">
        {/* Filter div */}
        <div className="p-4 border rounded-lg w-64">
        <h2 className="text-xl font-bold mb-4">Filter</h2>
               {/* Colors Filter  */}
        <div className="mb-4">
  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <input type="checkbox" className="peer" />
    <div className="collapse-title text-lg font-medium">Color</div>
    <div className="collapse-content">
      <form className="mt-2">
        {colors.map((color) => (
          <div key={color} className="flex items-center mb-2">
            <input
              type="radio"
              name="brand"
              value={color}
              id={color}
              className="radio radio-primary border-orange-600 hover:border-orange-600 checked:bg-orange-600 checked:border-orange-600"
              onChange={handleBrandChange}
              checked={selectedColor === color}
            />
            <label htmlFor={color} className="ml-2">
              {color}
            </label>
          </div>
        ))}
      </form>
    </div>
  </div>
</div>

{/* Types filter */}

      </div>
        {/* Cart div */}
        {Flashsales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-32">
            {Flashsales.map((sale) => {
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
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">No product available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFlashSale;
