import Rating from "react-rating";
import { useLoaderData, useParams } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa'
import ImageZoom from "../../Home/FlashSale/FlasSaleDetails/ImageZoom";


const SellerProductsDetails = () => {
    const CardsInfo = useLoaderData();
    const { id } = useParams();
   const InfoCard = CardsInfo?.find(brand => brand._id === id);
    console.log("InfoCard",InfoCard)
    const DiscountPercentage = Math.round(((InfoCard?.price - InfoCard?.discount_price) / InfoCard?.price) * 100);
   
    
    return (
        <div>
           <div className="flex mt-40 ml-40">
                <div className="relative mr-10 ">
                    <div className="block lg:hidden">
                        <img className="w-80 h-full object-cover shadow-xl bg-slate-200" src={InfoCard?.image} alt={InfoCard?.name} />
                    </div>
                    <div className="hidden lg:block w-80 h-[400px] border hover:border-orange-500 p-5">
                        <ImageZoom className="" src={InfoCard?.image} alt={InfoCard?.name} />
                    </div>
                </div>

                {/* Text div */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold">{InfoCard?.name}</h1>
                    {/* Rating display */}
                    <div className="flex items-center gap-3">
                        
                        <Rating
                            initialRating={InfoCard?.rating}
                            readonly
                            emptySymbol={<FaRegStar color="orange" />}
                            fullSymbol={<FaStar color="orange" />}
                        />
                        <span>({InfoCard?.rating})</span>
                    </div>
                    <h1 className="text-lg w-[54%]">{InfoCard.details}</h1>
                    <p className="text-3xl text-orange-600 ">ট {InfoCard?.discount_price}</p>
                    <div className="flex gap-3">
                        <p className="text-sm text-gray-600 line-through">ট {InfoCard?.price}</p>
                        <p className="text-sm">-{DiscountPercentage}%</p>
                    </div>

                    {/* Size selector */}
                   

                    {/* Quantity controls */}
                    

                    

                    {/* Buttons */}
                    
                </div>
            </div>
        </div>
    );
};

export default SellerProductsDetails;