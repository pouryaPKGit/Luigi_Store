import React from 'react';
import Image from "next/image";

const Banner2: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-10 mt-28 mb-28 justify-center mx-10'>
      <div className='relative' data-aos="fade-down-left">
        <Image
          src="/Footer/Banner2/photo_2024-09-16_17-18-58.jpg1.jpg"
          alt="Description of the image"
          priority={true}
          className='cursor-pointer shadow-md rounded-xl shadow-white hover:opacity-75 duration-300'
          width={650} 
          height={650}
        />
        <div className="absolute top-4 xs:top-7 sm:right-6 right-2 text-white text-right">
          <div className='flex flex-col gap-3'>
            <p className="font-bold text-xl">Rayzer</p>
            <p className='text-sm sm:text-lg'>موس گیمینگ مدل RGB از برند Razer</p>
            <p className='text-sm text-gray-300'>با گارانتی 48 ماه از لوییجی</p>
          </div>
        </div>
      </div>

      <div className='relative' data-aos="fade-down-right">
        <Image
          src="/Footer/Banner2/photo_2024-09-16_17-19-09.jpg0002.jpg"
          alt="Description of the image"
          priority={true}
          className='cursor-pointer shadow-md rounded-xl shadow-white hover:opacity-75 duration-300'
          width={650} 
          height={650}
        />
        <div className="absolute sm:top-40 top-5 xs:top-10 right-6 text-white text-right">
          <div className='flex flex-col gap-3'>
            <p className="font-bold text-xl">Redragon</p>
            <p className='text-sm sm:text-lg'>موس های سری جدید Redragon</p>
            <p className='text-sm text-gray-300'>با گارانتی مادامالعمر</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
