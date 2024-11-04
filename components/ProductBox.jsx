import React from "react";
import Image from "next/image";
import { TiStarOutline, TiStar } from "react-icons/ti";
import { AllBoxes } from '../Assets/ProductsDetailes';
import Link from 'next/link';
const ProductBox = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-center"
    data-aos="fade-up"
     data-aos-anchor-placement="top-center"
     data-aos-delay="400"
     >
      {AllBoxes.slice(8,14).map((product) => (
         
        <div
          key={product.id} 
          className="bg-[#181818] w-[400px] h-[320px] mt-20 rounded-xl cursor-pointer product-box hover:opacity-85 duration-300"
        >
          <Link href={`/product/${product.id}`}>
          <div className="flex justify-center items-center overflow-hidden"
          >
            <Image
              src={product.img}
              alt={product.name}
              priority={true}
              className="product-image mt-5"
              width={200}
              height={200}
            />
          </div>
          <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-white">{product.name}</p>
              <span className="text-white">{product.price.toLocaleString()} تومان</span>
            </div>
            <div className="flex text-xl mt-[52px]">
              <TiStarOutline />
              <TiStar />
              <TiStar />
              <TiStar />
              <TiStar />
            </div>
          </div>
          </Link>
        </div>
        
      ))}
    </div>
  );
};

export default ProductBox;
