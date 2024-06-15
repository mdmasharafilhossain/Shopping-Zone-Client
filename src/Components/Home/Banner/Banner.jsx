
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import banner1 from "../../../assets/bannerkids.png";
import banner2 from "../../../assets/bannermens.png";
import banner3 from "../../../assets/banneroffer.png";

const Banner = () => {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full" src={banner1} alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} alt="Banner 3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
