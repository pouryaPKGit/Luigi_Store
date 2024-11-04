import React from "react";
import Image from "next/image";
import { Banners4 } from "../Assets/ProductsDetailes";

const MiddleBanners = () => {
  return (
    <div className="flex flex-wrap mt-20 gap-24 py-10 justify-center">
      {Banners4.map((banner, index) => (
        <div
         data-aos="flip-left"
          key={index}
          className="relative transition-transform duration-700 ease-in-out hover:scale-105 hover:z-10"
        >
          <Image
            src={banner.img}
            alt={banner.description || "Banner Image"}
            priority={true}
            className="cursor-pointer rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.6)]"
            width={360}
            height={650}
          />
          <div
            className={`absolute top-4 right-4 flex flex-col items-start ${
              index === 1 ? "text-black" : "text-white"
            }`} // اگر index برابر 1 باشد، رنگ متن مشکی می‌شود
          >
            <p className="text-gray-400 font-bold text-sm">{banner.name}</p>
            <h2 className="font-bold text-xl">{banner.text}</h2>
            <p className="text-md font-semibold">{banner.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiddleBanners;
