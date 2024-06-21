import { useLoaderData, useParams } from "react-router-dom";
import ImageZoom from "./ImageZoom"; // Make sure the path is correct

const FlashSaleDetails = () => {
    const CardsInfo = useLoaderData();
    const { id } = useParams();

    const InfoCard = CardsInfo.result.find(brand => brand._id === id);

    const DiscountPercentage = Math.round(((InfoCard.price - InfoCard.discount_price) / InfoCard.price) * 100);

    return (
        <div className="flex mt-40 ml-40">
            <div className="relative w-52 h-80 mr-10">
                <ImageZoom src={InfoCard.image} alt={InfoCard.name} />
              
            </div>
        </div>
    );
};

export default FlashSaleDetails;
