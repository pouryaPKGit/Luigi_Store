"use client";
import React, { FC } from "react";
import { TypeAnimation } from "react-type-animation";

const Banner: FC = () => {
  return (
    <>
      <div className="bg-home-slider bg-cover bg-center w-[100%] h-[690px] flex items-center sm:justify-start sm:pr-20 justify-center px-10">
        <TypeAnimation
          sequence={[
            "ورود شما را به لوییجی خوش آمد میگم",
            1000,
            "از ضمانت مادام العمر ما بهره مند شو",
            1000,
            "تخفیف های ویژه شب سال نو رو دیدی ؟",
            1000,
          ]}
          wrapper="span"
          speed={20}
          repeat={Infinity}
          className="text-right -mt-60"
          style={{
            fontSize: "25px",
            color: "white",
            fontWeight: "bold",
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "5px",
          }}
        />
      </div>
    </>
  );
};

export default Banner;
