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
  const [typeSelect, setTypeSelect] = useState("");

  const {
    refetch,
    data: { result: Flashsales = [] } = {},
    isLoading,
  } = useQuery({
    queryKey: ["Flashsales", sortOrder, selectedColor,typeSelect],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/flashSale?sort=${sortOrder}&color=${selectedColor}&type=${typeSelect}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // filter area

  const handleTypeSort = (e) =>{
    const type = e.target.value;
    setTypeSelect(type);
    refetch();
  }

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    refetch();
  };

  const handleColorSort = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    refetch();
  };

  const colors = ["white", "pink", "Rose Gold", "Blue", "Green", "Yellow"];
  const types = ["Men","Women","Kids"]

  return (
    <div>
      <img className="w-full h-32" src={Sale_Banner} alt="Sale" />
      <div className="flex gap-2 justify-end mr-24 mt-10">
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
      <div className="flex justify-evenly mb-10">
        {/* Filter div */}
        <div className="p-4 border rounded-lg w-64 mt-20">
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
              onChange={handleColorSort}
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
<div className="mb-4">
  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <input type="checkbox" className="peer" />
    <div className="collapse-title text-lg font-medium">Types</div>
    <div className="collapse-content">
      <form className="mt-2">
        {types.map((type) => (
          <div key={type} className="flex items-center mb-2">
            <input
              type="radio"
              name="type"
              value={type}
              id={type}
              className="radio radio-primary border-orange-600 hover:border-orange-600 checked:bg-orange-600 checked:border-orange-600"
              onChange={handleTypeSort}
              checked={typeSelect === type}
            />
            <label htmlFor={type} className="ml-2">
              {type}
            </label>
          </div>
        ))}
      </form>
    </div>
  </div>
</div>

      </div>
        {/* Cart div */}
        {Flashsales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
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
