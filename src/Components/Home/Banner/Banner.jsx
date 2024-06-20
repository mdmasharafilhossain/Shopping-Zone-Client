
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import banner1 from "../../../assets/bannerkids.png";
import banner2 from "../../../assets/bannermens.png";
import banner3 from "../../../assets/banneroffer.png";
import banner4 from "../../../assets/img3.jpg";
import banner5 from "../../../assets/img4.jpg";


const Banner = () => {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
         <div>
         <img className=" h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner1} alt="Banner 1" />
         <button className="btn absolute border-orange-500 hover:bg-orange-400 px-10 top-3/4  lg:left-[500px] transform -translate-y-1/2">Shop Now</button>
         </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner2} alt="Banner 2" />
          <button className="btn absolute border-orange-500 hover:bg-orange-400 px-10 top-3/4  lg:left-[500px] transform -translate-y-1/2">Shop Now</button>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner3} alt="Banner 3" />
          
          <button className="btn absolute border-gray-400 hover:bg-gray-400 px-10 top-3/4  lg:left-[500px] transform -translate-y-1/2">Shop Now</button>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner4} alt="Banner 3" />
          <button className="btn absolute border-blue-500 hover:bg-blue-400 px-10 lg:top-[370px]  lg:left-[460px] transform -translate-y-1/2">Shop Now</button>

        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner5} alt="Banner 3" />
          <button className="btn absolute border-orange-400 hover:bg-orange-400 px-10 lg:top-[320px]  lg:left-[250px] transform -translate-y-1/2">Shop Now</button>
        </SwiperSlide>
       
      </Swiper>
    </>
  );
};

export default Banner;
