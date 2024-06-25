import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/autoplay";
import './FlashSale.css';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from 'react-icons/ai';
import Rating from "react-rating";
import { FaStar, FaRegStar } from 'react-icons/fa';
import useCart from "../../Shared/Hooks/useCart/useCart";
import { useContext } from 'react';
import { AuthContext } from "../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";

const FlashSale = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-600 font-bold">Sale Ended!</span>;
    } else {
      return (
        <div className="flex space-x-2 text-white text-lg font-semibold mt-20">
          <div className="bg-orange-500 px-3 py-2 rounded-lg">
            <span>End: {days}</span>
            <span>d</span>
          </div>
          <div className="bg-orange-500 px-3 py-2 rounded-lg">
            <span>{hours}</span>
            <span>h</span>
          </div>
          <div className="bg-orange-500 px-3 py-2 rounded-lg">
            <span>{minutes}</span>
            <span>m</span>
          </div>
          <div className="bg-orange-500 px-3 py-2 rounded-lg">
            <span>{seconds}</span>
            <span>s</span>
          </div>
        </div>
      );
    }
  };

  const AxiosPublic = useAxiosPublic();
  const {  data: { result: sales = [] } = {} } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const res = await AxiosPublic.get("/flashSale");
      return res.data;
    }
  });

  const ShowData = sales.slice(0, 7);
  
// White LIst 
const {user} = useContext(AuthContext);
const navigate = useNavigate();
const handleWhiteList = async (sale) => {
  if (!user?.email) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please log in to add items to the whitelist",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/login');
    return;
  }
  try {
    const res = await AxiosPublic.post('/whiteList', {
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
      quantity: sale.quantity
    });
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Added to whitelist successfully`,
        showConfirmButton: false,
        timer: 1500
      });
      
    }
    else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Already Added`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    console.error('Error adding to whitelist:', error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: `Error: ${error.message}`,
      showConfirmButton: false,
      timer: 1500
    });
  }
};

  return (
    <div className="ml-10 mr-5">
      <div className="flex justify-between items-center">
        <SectionTitle heading={"Flash Sale"} />
        <Countdown date={Date.now() + 1000000000} renderer={renderer} />
        <Link to="/flashSale"><button className="bg-orange-500 mt-20 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition">
          View All
        </button></Link>
      </div>
      <hr className="mt-5 border-t-2 border-gray-300" />

      {/* Cart */}
      <div className="mt-5">
        <Swiper
          cssMode={true}
          navigation={true}
          slidesPerView={6}
          spaceBetween={20}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {ShowData.map(sale => {
            const DiscountPercentage = Math.round(((sale.price - sale.discount_price) / sale.price) * 100);
            return (
              <SwiperSlide key={sale._id}>
                
                  <div className="flex">
                    <div className="border p-6 w-60 h-80 rounded-lg bg-white hover:border-orange-500 hover:shadow-xl relative">
                      <div className="absolute top-2 left-2">
                        <p className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
                          -{DiscountPercentage}%
                        </p>
                      </div>
                      <div className="absolute top-2 right-2">
                        <button onClick={() => handleWhiteList(sale)}
                        className="text-orange-500 hover:text-orange-700">
                          <AiOutlineHeart size={24} />
                        </button>
                      </div>
                      {/* Cart Image, Text Div */}
                      <Link to={`flashSale/sale/${sale._id}`}><div>
                      <img className="w-40 h-40 mb-2 mx-auto object-scale-down  hover:scale-110 transition-all" src={sale.image} alt={sale.name} />
                      <h3 className="text-base font-semibold mt-3">{sale.name}</h3>
                      <p className="text-base text-orange-600 ">ট {sale.discount_price}</p>
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
                      </Link>
                    </div>
                  </div>
                
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default FlashSale;
