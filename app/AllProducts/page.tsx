"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import MainSlider from "../../components/MainSlider";
import { AllBoxes } from "../../Assets/ProductsDetailes";
import { StaticImageData } from 'next/image';
const ITEMS_PER_PAGE = 8; // تعداد آیتم‌هایی که در هر صفحه نمایش داده می‌شوند

// تعریف تایپ محصول
interface Product {
  id: number; // یا string بر اساس نوع id
  img: string | StaticImageData; // پشتیبانی از نوع StaticImageData
  name: string;
  price: number; // یا string اگر قیمت شامل واحد باشد
}

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1); // مدیریت صفحه فعلی

  // محاسبه تعداد کل صفحات
  const totalPages: number = Math.ceil(AllBoxes.length / ITEMS_PER_PAGE);

  // آیتم‌های قابل نمایش در صفحه فعلی
  const currentItems: Product[] = AllBoxes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // جابه‌جایی به صفحه بعد
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // جابه‌جایی به صفحه قبل
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div>
        <h1 className='bg-white text-black w-[150px] h-[40px] mt-10  rounded-md font-semibold mr-28 text-md flex items-center justify-center'>تمامی محصولات </h1>
      </div>
      <div className="pt-16 flex flex-wrap justify-center gap-8 px-5">
        {currentItems.map((item: Product, index: number) => (
          <div key={index} className="bg-black rounded-2xl shadow-white shadow-md p-3 w-[300px] h-[360px] group relative overflow-hidden">
            <Link href={`/product/${item.id}`}>
              <div className="flex flex-col gap-y-2 items-center">
                <div className="relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    priority={true}
                    className="cursor-pointer transition-transform duration-700 group-hover:scale-110"
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

      <div className="flex justify-center mt-10">
        <button
          onClick={goToPreviousPage}
          className={`px-4 py-2 bg-[#181818] text-white rounded-md shadow-sm shadow-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
        >
          قبلی
        </button>
        <span className="px-4 py-2 text-white">{currentPage} از {totalPages}</span>
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 bg-[#181818] text-white rounded-md shadow-sm shadow-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
        >
          بعدی
        </button>
      </div>
      <div>
        <h1 className='bg-white text-black w-[170px] h-[40px] mt-20 rounded-md font-semibold mr-28 text-md flex items-center justify-center'>پر فروش های مجموعه</h1>
      </div>
      <div className="mt-10 mb-16 w-[86%] mx-auto flex gap-10 bg-[#181818] rounded-xl">
        <MainSlider />
      </div>
    </>
  );
}

export default Page;
