import React from 'react'
import Image from "next/image";
const Banners = () => {
  return (
    <div className='flex flex-wrap px-10 md:px-0 justify-center gap-5 mt-10 md:mt-20'>
      <div data-aos="fade-left">
      <Image
            src="/MainImages/er1.jpg"
            alt="Description of the image"
            priority={true} 
            className=" rounded-lg cursor-pointer hover:opacity-55 duration-500"
            width={600} 
            height={600}
          />
          </div>
          <div data-aos="fade-right">
          <Image
            src="/MainImages/er2.jpg"
            alt="Description of the image"
            priority={true} 
            className="rounded-lg cursor-pointer hover:opacity-55 duration-500"
            width={600} 
            height={600}
          />
          </div>
    </div>
  )
}

export default Banners
