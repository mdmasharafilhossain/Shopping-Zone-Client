import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ImageZoom from "./ImageZoom";
import AddComment from "../AddComment/AddComment";
import Header from "../../Header/Header";
import useAxiosPublic from "../../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";

const FlashSaleDetails = () => {
    const CardsInfo = useLoaderData();
    const AxiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const InfoCard = CardsInfo?.result?.find(brand => brand._id === id);

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
                seller_email:InfoCard.seller_email,
                customer_email:user?.email,
                productSize:InfoCard.size,
                rating:InfoCard.rating
            });
            console.log('Added to cart:', res.data);
            if(res.data.insertedId){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Add to cart Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Error:${error}`,
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
                title: "Please log in to add items to the cart",
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
                seller_email:InfoCard.seller_email,
                customer_email:user?.email,
                productSize:InfoCard.size,
                rating:InfoCard.rating
            });
            console.log('Purchased:', res.data);
            
        } catch (error) {
            console.error('Error purchasing:', error);
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="flex mt-40 ml-40">
            <div className="relative mr-10 ">
            <div className="block lg:hidden">
                    <img className="w-80 h-full object-cover shadow-xl bg-slate-200" src={InfoCard?.image} alt={InfoCard?.name} />
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
                        <button onClick={handleAddToCart}
                         className="w-1/4 border py-2 text-lg font-bold rounded-md border-orange-600 hover:bg-orange-600 hover:shadow-xl hover:text-white">Add To Cart</button>
                        <button onClick={handleBuyNow}
                        className="w-1/4 border py-2 text-lg font-bold rounded-md border-blue-600 hover:bg-blue-600 hover:shadow-xl hover:text-white">Buy Now</button>
                      </div>
            </div>


            
            

        </div>
        <AddComment InfoCard={InfoCard}></AddComment>
        </div>
    );
};

export default FlashSaleDetails;
