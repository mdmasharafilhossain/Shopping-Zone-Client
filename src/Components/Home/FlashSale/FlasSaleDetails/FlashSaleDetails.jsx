import { useLoaderData, useParams } from "react-router-dom";
import ImageZoom from "./ImageZoom";
import AddComment from "../AddComment/AddComment";
import Header from "../../Header/Header";

const FlashSaleDetails = () => {
    const CardsInfo = useLoaderData();
    const { id } = useParams();

    const InfoCard = CardsInfo?.result?.find(brand => brand._id === id);

    const DiscountPercentage = Math.round(((InfoCard?.price - InfoCard?.discount_price) / InfoCard?.price) * 100);

    return (
        <div>
            <Header></Header>
            <div className="flex mt-40 ml-40">
            <div className="relative mr-10 ">
            <div className="block lg:hidden">
                    <img className="w-80 h-full object-cover" src={InfoCard?.image} alt={InfoCard?.name} />
                </div>
                <div className="hidden lg:block w-80 h-96 border hover:border-orange-500 p-5">
                    <ImageZoom className=""  src={InfoCard?.image} alt={InfoCard?.name} />
                </div>
              
            </div>

            {/* Text div */}
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">{InfoCard?.name}</h1>
                <h1 className="text-lg  w-[54%]">{InfoCard.details}</h1>
                      <p className="text-3xl text-orange-600 ">ট {InfoCard?.discount_price}</p>
                      <div className="flex gap-3">
                         <p className="text-sm text-gray-600 line-through">ট {InfoCard?.price}</p>
                        <p className="text-sm">
                          -{DiscountPercentage}%
                        </p>
                      </div>



                      {/* Button */}
                      <div className="flex gap-10">
                        <button className="w-1/4 border py-2 text-lg font-bold rounded-md border-orange-600 hover:bg-orange-600 hover:shadow-xl hover:text-white">Add To Cart</button>
                        <button className="w-1/4 border py-2 text-lg font-bold rounded-md border-blue-600 hover:bg-blue-600 hover:shadow-xl hover:text-white">Buy Now</button>
                      </div>
            </div>


            
            

        </div>
        <AddComment InfoCard={InfoCard}></AddComment>
        </div>
    );
};

export default FlashSaleDetails;
