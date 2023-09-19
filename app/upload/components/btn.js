import { useSwiper } from "swiper/react";

export default function SwiperButtonNext ({ children }){
  const swiper = useSwiper();
  return <button className="btn" onClick={() => swiper.slideNext()}>{children}</button>;
};