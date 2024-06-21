import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Countdown from "react-countdown";


import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/autoplay";
import './FlashSale.css'
import { Navigation, Mousewheel, Keyboard,Autoplay } from 'swiper/modules';
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


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
  const { refetch, data: { result: sales = [] } = {} } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const res = await AxiosPublic.get("/flashSale");
      return res.data;
    }
  });

  const ShowData = sales.slice(0,7);

  return (
    <div className="ml-10 mr-5">
      <div className="flex justify-between items-center">
        <SectionTitle heading={"Flash Sale"} />
        <Countdown date={Date.now() + 1000000000} renderer={renderer} />
        <button className="bg-orange-500 mt-20 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition">
          View All
        </button>
      </div>
      <hr className="mt-5 border-t-2 border-gray-300" />
      
      {/* Cart */}
      <div className="mt-5">
        <Swiper
          cssMode={true}
          navigation={true}
          slidesPerView={5}
          spaceBetween={20}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard, Autoplay ]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {ShowData.map(sale => (
            <SwiperSlide key={sale._id}>
              <div className="border items-center text-center space-y-2 p-5 rounded-lg">
                <img className="w-40 h-40 mx-auto object-scale-down  hover:scale-110 transition-all" src={sale.image} alt={sale.name} />
                <h1 className="font-bold">{sale.name}</h1>
                <p></p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FlashSale;
