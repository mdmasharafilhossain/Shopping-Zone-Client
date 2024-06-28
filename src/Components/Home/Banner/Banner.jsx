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
            <img
              className=" h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]"
              src={banner1}
              alt="Banner 1"
            />
            <button className=" hidden md:block lg:block btn absolute border-orange-500 hover:bg-orange-400 lg:px-10   top-3/4 text-[6px] md:text-xs lg:text-sm md:left-[200px] lg:left-[500px] transform -translate-y-1/2">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]"
            src={banner2}
            alt="Banner 2"
          />
          <button className=" hidden md:block lg:block btn absolute border-orange-500 hover:bg-orange-400 lg:px-10   top-3/4 text-[6px] md:text-xs lg:text-sm md:left-[200px] lg:left-[500px] transform -translate-y-1/2">
            Shop Now
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]"
            src={banner3}
            alt="Banner 3"
          />

          <button className="hidden md:block lg:block btn absolute border-gray-400 hover:bg-gray-400 lg:px-10 top-3/4 text-[6px] md:text-xs lg:text-sm md:left-[200px] lg:left-[500px] transform -translate-y-1/2">
            Shop Now
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]"
            src={banner4}
            alt="Banner 3"
          />
          <button className="hidden md:block lg:block btn absolute border-blue-500 hover:bg-blue-400 lg:px-10  top-[75%] lg:top-[90%] [6px] md:text-xs lg:text-sm md:left-[200px] lg:left-[500px] transform -translate-y-1/2">
            Shop Now
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]"
            src={banner5}
            alt="Banner 3"
          />
          <button className="hidden md:block lg:block btn absolute border-orange-500 hover:bg-orange-400 lg:px-10  top-[75%] lg:top-[80%] [6px] md:text-xs lg:text-sm md:left-[50px] lg:left-[300px] transform -translate-y-1/2">
            Shop Now
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
