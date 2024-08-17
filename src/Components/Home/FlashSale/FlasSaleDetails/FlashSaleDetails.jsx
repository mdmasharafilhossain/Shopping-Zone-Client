import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import ImageZoom from "./ImageZoom";
import AddComment from "../AddComment/AddComment";
import Header from "../../Header/Header";
import useAxiosPublic from "../../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useCart from "../../../Shared/Hooks/useCart/useCart";
import Footer from "../../Footer/Footer";
import useSeller from "../../../useSeller/useSeller";
import useAdmin from "../../../useAdmin/useAdmin";

const FlashSaleDetails = () => {
    const ItemsInfo = useLoaderData();
    const AxiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    console.log("Id:",id)
    const navigate = useNavigate();
    const [,refetch] = useCart();

    const InfoCard = ItemsInfo?.find(brand => brand._id === id);
    console.log("InfoCard:",InfoCard)
    const [quantity, setQuantity] = useState(1);
    const sizes = InfoCard?.size ? InfoCard.size.split(',') : ['One Size'];
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const DiscountPercentage = Math.round(((InfoCard?.price - InfoCard?.discount_price) / InfoCard?.price) * 100);

    const handleAddToCart = async () => {
        if (!user?.email) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please log in to add items to the cart",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
            return;
        }
        try {
            const res = await AxiosPublic.post('/cart', {
                productCode: InfoCard.code,
                name: InfoCard.name,
                image: InfoCard.image,
                price: InfoCard.price,
                discountPrice: InfoCard.discount_price,
                discountPercentage: DiscountPercentage,
                details: InfoCard.details,
                seller_email: InfoCard.seller_email,
                customer_email: user?.email,
                productSize: selectedSize,
                rating: InfoCard.rating,
                quantity: quantity,
                Offer_coupon:InfoCard?.Offer_coupon || '',
                Offer_Percentage:InfoCard?.Offer_Percentage || '',
                price_11_to_20: InfoCard?.price_11_to_20 || InfoCard.discount_price,
        price_21_to_50:  InfoCard?.price_21_to_50 || InfoCard.discount_price,
        price_51_to_100: InfoCard?.price_51_to_100 || InfoCard.discount_price,
        price_101_to_200:InfoCard?.price_101_to_200 || InfoCard.discount_price,
        price_201_to_500:InfoCard?.price_201_to_500 || InfoCard.discount_price,
        price_501_to_1000:InfoCard?.price_501_to_1000 || InfoCard.discount_price,
            });
            console.log('Added to cart:', res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Added to cart successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Error: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleBuyNow = async () => {
        if (!user?.email) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please log in to buy items",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
            return;
        }
        try {
            const res = await AxiosPublic.post('/buy', {
                productCode: InfoCard.code,
                name: InfoCard.name,
                image: InfoCard.image,
                price: InfoCard.price,
                discountPrice: InfoCard.discount_price,
                discountPercentage: DiscountPercentage,
                details: InfoCard.details,
                seller_email: InfoCard.seller_email,
                customer_email: user?.email,
                productSize: selectedSize,
                rating: InfoCard.rating,
                quantity: quantity,
                Offer_coupon:InfoCard?.Offer_coupon || '',
                Offer_Percentage:InfoCard?.Offer_Percentage || '',
                price_11_to_20: InfoCard?.price_11_to_20 || "",
                price_21_to_50:  InfoCard?.price_21_to_50 || "",
                price_51_to_100: InfoCard?.price_51_to_100 || "",
                price_101_to_200:InfoCard?.price_101_to_200 || "",
                price_201_to_500:InfoCard?.price_201_to_500 || "",
                price_501_to_1000:InfoCard?.price_501_to_1000 || "",
            });
            console.log('Purchased:', res.data);
            if (res.data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Purchase successful`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error purchasing:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Error: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const handleSizeChange = (e) => setSelectedSize(e.target.value);
    const [isSeller] =useSeller();
  const [isUserAdmin] = useAdmin();

    return (
        <div>
            <Header />
            <div className="flex mt-40 ml-40">
                <div className="relative mr-10 ">
                    <div className="block lg:hidden">
                        <img className="w-80 h-full object-cover shadow-xl bg-slate-200" src={InfoCard?.image} alt={InfoCard?.name} />
                    </div>
                    <div className="hidden lg:block w-80 h-[400px] border hover:border-blue-500 p-5">
                        <ImageZoom className="" src={InfoCard?.image} alt={InfoCard?.name} />
                    </div>
                </div>

                {/* Text div */}
                <div className="space-y-3  w-[1500px]">
                    <h1 className="text-3xl font-bold">{InfoCard?.name}</h1>
                    {/* Rating display */}
                    <div className="flex items-center gap-3">
                        
                        <Rating
                            initialRating={InfoCard?.rating}
                            readonly
                            emptySymbol={<FaRegStar color="blue" />}
                            fullSymbol={<FaStar color="blue" />}
                        />
                        <span>({InfoCard?.rating})</span>
                    </div>
                    <h1 className="text-lg w-[54%]">{InfoCard?.details}</h1>
                    <p className="text-3xl text-blue-600 ">ট {InfoCard?.discount_price}</p>
                    <div className="flex gap-3">
                        <p className="text-sm text-gray-600 line-through">ট {InfoCard?.price}</p>
                        <p className="text-sm">-{DiscountPercentage}%</p>
                    </div>

                    {/* Size selector */}
                    <div className="flex items-center gap-3">
                        <span>Size</span>
                        <select value={selectedSize} onChange={handleSizeChange} className="px-3 py-1 border rounded">
                            {sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                        <span>Quantity</span>
                        <button onClick={decrementQuantity} className="px-3 py-1 border rounded">-</button>
                        <span>{quantity}</span>
                        <button onClick={incrementQuantity} className="px-3 py-1 border rounded">+</button>
                    </div>

                    

                    {/* Buttons */}
                    {
                        isSeller || isUserAdmin ? 
                        <div className="flex gap-10">
                         <button disabled onClick={handleAddToCart}
                            className="w-1/4 border py-2 text-lg font-bold text-black rounded-md    ">Add To Cart</button>
                        <button disabled onClick={handleBuyNow}
                            className="w-1/4 border py-2 text-lg font-bold rounded-md text-black">Buy Now</button>
                    </div>


                        :
                        <div className="flex gap-10">
                        <button onClick={handleAddToCart}
                            className="w-1/4 border py-2 text-lg font-bold rounded-md border-blue-600 hover:bg-blue-600 hover:shadow-xl hover:text-white">Add To Cart</button>
                        <button onClick={handleBuyNow}
                            className="w-1/4 border py-2 text-lg font-bold rounded-md border-blue-600 hover:bg-blue-600 hover:shadow-xl hover:text-white">Buy Now</button>
                    </div>
                    }
                </div>
            </div>
            <AddComment InfoCard={InfoCard} />
            <Footer></Footer>
        </div>
    );
};

export default FlashSaleDetails;
