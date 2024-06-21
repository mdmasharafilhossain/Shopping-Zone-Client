
const FlashSaleCard = ({sale}) => {
    const {image} = sale || {}
    return (
        <div>
            <img src={image} alt="" />
        </div>
    );
};

export default FlashSaleCard;