import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const SwiperSlideComponent =()=>{
    return(
        <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={2}          // دو اسلاید هم‌زمان
      spaceBetween={20}
      loop={true}                // حالت چرخشی
      autoplay={{
        delay: 2000,             // هر ۲ ثانیه اسلاید بعدی
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      style={{ width: "80%", height: "250px" }}
    >
      <SwiperSlide style={{ background: "#ffb703", display: "flex", alignItems: "center", justifyContent: "center" }}>Slide 1</SwiperSlide>
      <SwiperSlide style={{ background: "#8ecae6", display: "flex", alignItems: "center", justifyContent: "center" }}>Slide 2</SwiperSlide>
      <SwiperSlide style={{ background: "#219ebc", display: "flex", alignItems: "center", justifyContent: "center" }}>Slide 3</SwiperSlide>
      <SwiperSlide style={{ background: "#fb8500", display: "flex", alignItems: "center", justifyContent: "center" }}>Slide 4</SwiperSlide>
    </Swiper>
    )
}

export default SwiperSlideComponent