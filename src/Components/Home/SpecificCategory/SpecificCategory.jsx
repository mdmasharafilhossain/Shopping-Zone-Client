import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";

const SpecificCategory = () => {
    const CardsInfo = useLoaderData();
    const AxiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { category } = useParams();
    console.log("category", category);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [typeSelect, setTypeSelect] = useState("");

  const { 
    data: SpecificProducts = [], isLoading, refetch } = useQuery({
    queryKey: ['SpecificProducts',sortOrder, selectedColor, typeSelect],
    queryFn: async () => {
        const res = await AxiosPublic.get(`/allProducts?sort=${sortOrder}&color=${selectedColor}&type=${typeSelect}`);
        console.log(res.data);
        return res.data;
    }
    
});
const filteredProducts = SpecificProducts.filter(product => product.category === category);
if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error text-9xl"></span>
      </div>
    );
  }

if(filteredProducts.length === 0){
    return <div className="flex justify-center items-center h-64">
    <p className="text-xl text-gray-500">No product available</p>
  </div>
}
  const handleWhiteList = async (sale) => {
    if (!user?.email) {
      Swal.fire({
         position: "top-end",
        icon: "error",
        title: "Please log in to add items to the whitelist",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    }
    try {
      const res = await AxiosPublic.post("/whiteList", {
        productCode: sale.code,
        name: sale.name,
        image: sale.image,
        price: sale.price,
        discount_price: sale.discount_price,
        discountPercentage: sale.discountPercentage || "",
        details: sale.details,
        seller_email: sale.seller_email,
        customer_email: user?.email,
        productSize: sale.productSize,
        rating: sale.rating,
        quantity: sale.quantity || "",
      });
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Added to whitelist successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Already Added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to whitelist:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Error: ${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

    

    // Filter products based on the category
    
   
    
      const handleTypeSort = (e) => {
        const type = e.target.value;
        setTypeSelect(type);
        refetch();
      };
    
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
    
      const handleReset = () => {
        setSortOrder("");
        setSelectedColor("");
        setTypeSelect("");
        refetch();
      };
    
      const colors = ["white", "pink", "Rose Gold", "Blue", "Green", "Yellow"];
      const types = ["Men", "Women", "Kids"];

    return (
        <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">Category: <span className='text-[#FF3811]'>{category}</span></h2>
            </div>
            {isLoading ? (
                      <div className="flex justify-center items-center min-h-screen">
                      <span className="loading loading-spinner text-error text-9xl"></span>
                    </div>
              
            ) : (
                // MAin div
               <div>
<div className="flex gap-2 justify-end mr-24 mt-10">
        <div>
          <p className="text-lg mt-1">Sort by:</p>
        </div>
        <select
          className="select select-bordered select-sm rounded-md w-48 mt-1 max-w-xs"
          onChange={handleSort}
          value={sortOrder}
        >
          <option value="" disabled>
            Default
          </option>
          <option value="lowToHigh">Low price to high price</option>
          <option value="highToLow">High price to low price</option>
        </select>
      </div>

      <div className="flex justify-evenly mb-10">
        <div className="p-4 border rounded-lg w-64 mt-20">
          <h2 className="text-xl font-bold mb-4">Filter</h2>
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

          <button
            className="btn btn-outline btn-warning w-full mt-4"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
            {filteredProducts.map((sale) => {
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
                    <button
                      onClick={() => handleWhiteList(sale)}
                      className="text-orange-500 hover:text-orange-700"
                    >
                      <AiOutlineHeart size={24} />
                    </button>
                  </div>
                  <Link to={`category/${sale._id}`}>
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
                      {/* Rating */}
                      <div className="flex items-center gap-3 mt-5">
                        <Rating
                          initialRating={sale?.rating}
                          readonly
                          emptySymbol={<FaRegStar color="orange" />}
                          fullSymbol={<FaStar color="orange" />}
                        />
                        <span className="">({sale?.rating})</span>
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


            )}
        </div>
    );
};

export default SpecificCategory;
