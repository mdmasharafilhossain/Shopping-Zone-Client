import { useLoaderData, useParams } from "react-router-dom";
import ImageZoom from "./ImageZoom";

const FlashSaleDetails = () => {
    const CardsInfo = useLoaderData();
    const { id } = useParams();

    const InfoCard = CardsInfo.result.find(brand => brand._id === id);

    const DiscountPercentage = Math.round(((InfoCard.price - InfoCard.discount_price) / InfoCard.price) * 100);

    return (
        <div className="flex mt-40 ml-40">
            <div className="relative mr-10 ">
            <div className="block lg:hidden">
                    <img className="w-80 h-full object-cover" src={InfoCard.image} alt={InfoCard.name} />
                </div>
                <div className="hidden lg:block w-80 h-96 border  p-5">
                    <ImageZoom className=""  src={InfoCard.image} alt={InfoCard.name} />
                </div>
              
            </div>

            {/* Text div */}
            <div>
                <h1 className="text-2xl font-bold">{InfoCard.name}</h1>
            </div>
        </div>
    );
};

export default FlashSaleDetails;
