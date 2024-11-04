"use client"
import Banner from '@/components/Banner'
import React from 'react'
import OffersPage from "../components/OffersPage"
import ProductsSlider from "../components/ProductsSlider"

import ProductBox from "../components/ProductBox"
import MiddleBanners from "../components/MiddleBanners"
import MainSlider from "../components/MainSlider"
import Popular from "../components/Popular"
import Services from "../components/Services"

import { BsArrow90DegDown } from "react-icons/bs";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const page = () => {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: 'top-center'
      })
    } ;
   initAOS();
  },[]);
  return (
    <div>
      <Banner/>
      <div className="mt-20 w-[95%] mx-auto flex gap-10 bg-[#151515] rounded-xl " id="discount-section">
      <OffersPage/>
      <ProductsSlider/>
   </div>
   
   <ProductBox/>
   <MiddleBanners/>
   <span className="lg:mr-12 mr-4 mt-16 text-md md:text-xl lg:text-2xl font-bold flex ">جدید ترین محصولات <BsArrow90DegDown className="mt-4 text-lg md:text-2xl font-bold mr-2" /></span>
   <div className="mt-10 w-[95%] mx-auto flex gap-10 bg-[#181818] rounded-xl">
    <MainSlider/>
   </div>
    <Popular/>
    <Services/>
   
    </div>
  )
}

export default page
