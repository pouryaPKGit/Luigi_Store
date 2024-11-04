"use client";
import { TiStarOutline, TiStar } from "react-icons/ti";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { AllBoxes } from "../Assets/ProductsDetailes"; // مسیر صحیح فایل محصولات را وارد کنید

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={false}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          1391: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1116: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          816: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          200: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {AllBoxes.slice(8,16).map((product) => (
          <SwiperSlide key={product.id}>
            
            <Link href={`/product/${product.id}`}>
              <div className="bg-black shadow-sm  my-2 w-[236px] h-[342px] mx-auto rounded-xl hover:rounded-[40px]  duration-700 hover:opacity-85 cursor-pointer">
                <div className="flex flex-col gap-1 pt-5 pr-2">
                 
                </div>
                <div>
                  <Image
                    src={product.img.src}
                    alt="Description of the image"
                    priority={true}
                    className="flex items-center justify-center m-auto -mt-5 "
                    width={176}
                    height={176}
                  />
                </div>
                <div className="flex px-3 items-start  text-sm text-white justify-center">
                  <p>{product.name}</p>
                </div>
                <div className="flex flex-col mt-10 items-start gap-y-2 pr-7">
                  <span className="text-sm text-white">{product.price} تومان</span>
                  <div className="flex text-xl  text-yellow-300">
                    <TiStarOutline />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                    <TiStar />
                  </div>
                </div>
                <div className="pl-3 pt-8"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
