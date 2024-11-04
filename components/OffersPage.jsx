"use client";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";

const OffersPage = () => {
  const targetDate = new Date().setDate(new Date().getDate() + 2);

  return (
    <div
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
    >
      <div className="bg-white w-[236px] h-[236px] mt-4 mr-2 rounded-full duration-500 cursor-pointer 2xs:block hidden group">
        <div className="flex flex-col items-center">
          <Image
            src="/MainImages/Products/Untitled-1.pngww.png"
            alt="Description of the image"
            priority={true}
            width={160}
            height={160}
            className="m-auto mt-5 transform transition-transform duration-[1500ms] group-hover:animate-spin-once"
          />
          <span className="text-black p-1 rounded-2xl text-sm z-0 font-semibold">
            تخفیف ویژه 40%
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mx-auto my-4"></div>
        <div className="text-center">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
