"use client"
import Image from "next/image";
import { useState } from "react";
import {  AllBoxes  } from "../Assets/ProductsDetailes";
import Link from "next/link";

const PopularCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("کیبورد"); // مقدار پیش‌فرض "کیبورد"

  // فیلتر کردن محصولات بر اساس دسته‌بندی انتخاب‌شده
  const filteredProducts =  AllBoxes .filter(item => item.category === selectedCategory);

  return (
    <div className="mt-20">
     
      <div className="flex flex-wrap gap-10 items-center px-3 justify-center ">
        <div 
          className={`flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === "موس" ? 'active' : ''}`}
          onClick={() => setSelectedCategory("موس")}
        >
          <Image
            src="/MainImages/4images/Untitled-1.png3.png" // تصویر کیبورد
            alt="کیبورد"
            priority={true}
            width={80}
            height={80}
            className=" hover:opacity-50 duration-300"
          />
         <span>موس</span>
        </div>

        <div 
          className={`flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === "کیبورد" ? 'active' : ''}`}
          onClick={() => setSelectedCategory("کیبورد")}
        >
           <Image
            src="/MainImages/4images/Untitled-1.png4.png" // تصویر آیپد
            alt="آیپد"
            priority={true}
            width={80}
            height={80}
            className=" hover:opacity-50 duration-300"
          />
          <span>کیبورد</span>
        </div>

        <div 
          className={`flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === "ایپد" ? 'active' : ''}`}
          onClick={() => setSelectedCategory("ایپد")}
        >
          <Image
            src="/MainImages/4images/Untitled-1.png5.png" // تصویر هدفون
            alt="هدفون"
            priority={true}
            width={80}
            height={80}
            className="mt-3 hover:opacity-50 duration-300"
          />
         <span>آیپد</span>
        </div>

        <div 
          className={`flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === "هدفون" ? 'active' : ''}`}
          onClick={() => setSelectedCategory("هدفون")}
        >
          <Image
            src="/MainImages/4images/Untitled-1.png1.png" // تصویر هدفون
            alt="هدفون"
            priority={true}
            width={80}
            height={80}
            className=" hover:opacity-50 duration-300"
          />
         <span>هدفون</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-8 px-5" >
        {filteredProducts.map((item, index) => (
          <div key={index} className="bg-black rounded-2xl shadow-white shadow-md p-3  w-[300px] h-[360px] group relative overflow-hidden " data-aos="zoom-in">
            <Link href={`/product/${item.id}`}>
              <div className="flex flex-col gap-y-2 items-center ">
                <div className="relative" >
                  <Image
                    src={item.img}
                    alt={item.name}
                    priority={true}
                    className="cursor-pointer transition-transform duration-700 group-hover:scale-110 "
                    width={269}
                    height={269}
                  />
                </div>
                <p className="text-sm font-semibold">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-semibold">{item.price} تومان</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
