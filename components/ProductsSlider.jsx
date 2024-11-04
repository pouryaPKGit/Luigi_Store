"use client";
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
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={false}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          1460: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1098: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          819: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {AllBoxes.slice(0, 8).map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div className="bg-black my-2 w-[236px] h-[342px] mx-auto rounded-xl hover:rounded-[40px] hover:opacity-30 duration-500 cursor-pointer">
                <div className="flex flex-col gap-1 pt-5 pr-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="flex w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
                <div>
                  <Image
                    src={product.img.src}
                    alt="Description of the image"
                    priority={true}
                    className="m-auto" // حذف کلاس‌های flex و justify-center در صورت نیاز
                    width={176}
                    height={176}
                  />
                </div>
                <div className="flex px-3 items-center m-auto text-sm text-white justify-center">
                  <p>{product.name}</p>
                </div>
                <div className="flex justify-between pr-3">
                  <div className="flex flex-col items-start gap-0.5 mt-5">
                    <span className="text-sm">
                      <del>{product.oldprice}</del> تومان
                    </span>
                    <span className="text-sm">{product.price} تومان</span>
                  </div>
                  <div className="pl-3 pt-8">
                    <span className="text-black bg-white rounded-xl px-1.5 py-0.5 text-sm">
                      {product.off}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
