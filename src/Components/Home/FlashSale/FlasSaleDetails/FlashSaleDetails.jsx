import { useLoaderData, useParams } from "react-router-dom";


const FlashSaleDetails = () => {
    const CardsInfo = useLoaderData();
    console.log(CardsInfo);
    const { id } = useParams();
    console.log("id",id)
    
    const InfoCard = CardsInfo.result.find(brand =>brand._id === id);
    
    console.log(InfoCard);
    return (
        <div>
            <h1 className="mt-20">{InfoCard.length}</h1>
            <img  src={InfoCard.image} alt="" />
        </div>
    );
};

export default FlashSaleDetails;