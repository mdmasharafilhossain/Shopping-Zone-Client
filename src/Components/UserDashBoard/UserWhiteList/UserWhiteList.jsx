import Rating from "react-rating";
import useWhiteList from "../../Shared/Hooks/useWhiteList/useWhiteList";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';

const UserWhiteList = () => {
    const [whiteList] = useWhiteList();
    return (
        <div>
            <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
                My <span className="text-[#FF3811]">White List</span>
            </h2>
            <hr className="my-2" />
            <div className="grid grid-cols-4 gap-10 ml-10 mt-10">
            {whiteList.map(sale => {
            const DiscountPercentage = Math.round(((sale.price - sale.discountPrice) / sale.price) * 100);
            return (
              <div key={sale._id}>
                
                  <div >
                    <div className="border p-6 w-60 h-80 rounded-lg bg-white hover:border-orange-500 hover:shadow-xl relative">
                      <div className="absolute top-2 left-2">
                        <p className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
                          -{DiscountPercentage}%
                        </p>
                      </div>
                      
                      {/* Cart Image, Text Div */}
                      <div>
                      <img className="w-40 h-40 mb-2 mx-auto object-scale-down  hover:scale-110 transition-all" src={sale.image} alt={sale.name} />
                      <h3 className="text-base font-semibold mt-3">{sale.name}</h3>
                      <p className="text-base text-orange-600 ">ট {sale.discountPrice}</p>
                      <div className="flex gap-3">
                        <p className="text-sm text-gray-600 line-through">ট {sale.price}</p>
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
                      
                    </div>
                  </div>
                
              </div>
            );
          })}
            </div>

        </div>
    );
};

export default UserWhiteList;