
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
import banner6 from "../../../assets/ban1.png";

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
          <img className=" h-[130px] md:h-[200px] lg:h-[410px]" src={banner1} alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px]" src={banner2} alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner3} alt="Banner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner4} alt="Banner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner5} alt="Banner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[130px] md:h-[200px] lg:h-[410px] lg:w-[2000px]" src={banner6} alt="Banner 3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
