"use client"
import  { useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { LiaStarSolid } from "react-icons/lia";
import { TfiPencilAlt } from "react-icons/tfi";
import { GiBeachBag } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import CountdownTimer from "../../../components/CountdownTimer";
import { FaTruck } from "react-icons/fa";
import { PiChatCircleTextLight } from "react-icons/pi";
import { MdOutlineDescription } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useEffect } from 'react';
import mediumZoom from "medium-zoom";
import { AllBoxes } from "../../../Assets/ProductsDetailes";
import { useContext } from "react";
import Swal from 'sweetalert2';
import { UserContext } from "../../../Context/Context";
import { ToastContainer } from 'react-toastify';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from "react-icons/fa6";
import ProductsSlider from "../../../components/ProductsSlider"
import OffersPage from "../../../components/OffersPage"
import { use } from 'react';
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => setRating(index + 1)}
          className="focus:outline-none"
        >
          {index < rating ? (
            <LiaStarSolid className="text-yellow-500 text-2xl" />
          ) : (
            <IoIosStarOutline className="text-gray-400 text-2xl" />
          )}
        </button>
      ))}
    </div>
  );
};

export default  function ProductDetails({ params }) {
  const { id: productId } = use(params); // Unwrap the promise
  const product = AllBoxes.find((product) => product.id.toString() === productId);

  
 

  
  const { addToLikes } = useContext(UserContext);

  const handleLikeClick = () => {
    addToLikes(product); 
    
  };

  const handleCartClick = () => {
    
    
  };

  const { user } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false); 
  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'خطا',
        text: 'لطفا وارد شوید تا بتوانید نظر خود را ثبت کنید.'
      });
      return;
    }

    
    if (!rating || !comment || !name || !email) {
      Swal.fire({
        icon: 'warning',
        title: 'خطا',
        text: 'لطفا تمام فیلدها را کامل کنید.'
      });
      return;
    }

    
    if (submitted) {
      Swal.fire({
        icon: 'info',
        title: 'اطلاع',
        text: 'شما قبلاً نظر خود را ثبت کرده‌اید.'
      });
      return;
    }

    
    Swal.fire({
      icon: 'success',
      title: 'موفق',
      text: 'نظر شما با موفقیت ثبت شد.'
    }).then(() => {
      setSubmitted(true);
      setRating(0);
      setComment('');
      setName('');
      setEmail('');
    });
  };
  const { addToCart } = useContext(UserContext);

  const handleAddToCart = () => {
    addToCart(product);
  };
 
  useEffect(() => {
  
    const zoom = mediumZoom(".zoomable", {
      margin: 20,
      background: "#BADA55", 
    });

    return () => zoom.detach(); 
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const targetDate = new Date().setDate(new Date().getDate() + 2);
  const [activeTab, setActiveTab] = useState('description'); 
  const [rating, setRating] = useState(0); 
  const [hoverText, setHoverText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  if (!product) {
    return <div>محصول مورد نظر یافت نشد.</div>;
  }
  

  const handleMouseEnter = (event) => {
    setHoverText('برای بزرگ شدن تصویر کلیک کنید');
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoverText('');
  };

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
    <div className="p-4">
      <div className="bg-[#181818] rounded-2xl min-h-[450px] mt-10 flex flex-wrap gap-y-10  3md:justify-between justify-center xs:gap-x-20 3md:gap-0 px-10 pt-5">
        <div style={{ position: 'relative' }}>
        <Image
            src={product.img.src}
            alt={product.name}
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="zoomable w-[300px] h-[300px] border bg-[#202020] rounded-full p-3"
            width={300} 
            height={300}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
      <br />
      <span className="text-white text-sm">درصد فروش محصول :</span>
      <div className="progress-container my-5">
        
  <div className="progress-bar">
    
  <p className="text-white pr-2">70%</p>
  </div>
</div>

      {hoverText && (
        <div
          style={{
            position: 'fixed',
            top: position.y + 10,
            left: position.x + 10,
            backgroundColor: 'white',
            color: 'gray',
            padding: '2px',
            borderRadius: '3px',
            pointerEvents: 'none',
          }}
        >
          {hoverText}
        </div>
      )}
        </div>
        
        <div>
          <h1 className="text-2xl pr-3 text-white font-bold">{product.name}</h1>
          <div className="bg-white text-black text-sm mt-3 w-[160px] h-[35px] px-1 rounded-2xl flex items-center justify-center gap-2">
            <VscWorkspaceTrusted className="text-black text-lg" />
            <p>تضمین اصالت کالا</p>
          </div>
          <div className="flex flex-wrap gap-5 mt-3">
            <div className="flex flex-col gap-3 items-start">
              <span className="flex gap-1 items-center bg-black justify-center w-[135px] h-[40px] rounded-2xl shadow-lg text-white">
                <GiBeachBag className="text-white" /> فروش موفق
              </span>
              <div className="flex gap-0.5 items-center pt-3 pr-2">
                <LiaStarSolid className="text-white text-lg" />
                <LiaStarSolid className="text-white text-lg" />
                <LiaStarSolid className="text-white text-lg" />
                <IoIosStarOutline className="text-gray-300 text-lg" />
                <IoIosStarOutline className="text-gray-300 text-lg" />
              </div>
            </div>
            <div className="w-[250px] bg-black h-[40px] flex items-center justify-center rounded-2xl shadow-lg">
              <span className="text-sm text-white">
                کد شناسایی محصول : <span className="text-white">150010186#</span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 items-center">
            <div className="mt-5 flex flex-col">
             

              <div className='text-xl mt-1'>{product.price} تومان</div>
            </div>
            <div className="pt-8" onClick={handleCartClick}>
              <button onClick={handleAddToCart} className="bg-black w-[200px] h-[40px] text-white rounded-md">افزودن به سبد خرید</button>
            </div>
            <div className="pt-8">
      <FaHeart
        className="bg-black h-[40px] w-[40px]  text-white p-2 rounded-md cursor-pointer -mr-5"
        onClick={handleLikeClick}
      />
      <ToastContainer />
    </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="bg-black  rounded-2xl p-2 h-[150px] w-[300px] flex flex-col  items-center justify-center">
            <span className="text-white">زمان باقی مانده تا پایان تخفیف</span>
            <CountdownTimer targetDate={targetDate} />
          </div>
          <div className="flex flex-col h-[100px] w-[300px] bg-black items-start pr-5 gap-2 justify-center rounded-2xl text-white">
            <span>برخی از ویژگی ها</span>
            <div className="flex items-center gap-3">
              <span>گارانتی تعویض 5 ماهه + 10% تخفیف</span>
              <div className="flex items-center gap-2">
      
     
     
    </div>
            </div>
          </div>
          <div className="h-[50px] w-[300px] rounded-2xl bg-black">
            <div className="flex items-center gap-2 pt-3 pr-3">
              <VscWorkspaceTrusted className="text-white text-lg" />
              <span className="text-white text-sm">ضمانت 180 روزه کالا</span>
            </div>
          </div>
          <div className="flex  gap-2 text-lg text-white mt-2 pl-20">
            <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center">
              <FaTruck className="text-white text-3xl" />
            </div>
            <div className="flex flex-col pb-10">
              <span>ارسال تا 7 روز آینده</span>
              <span className="text-gray-400 text-sm">تضمین شده</span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[170px] w-[100%] mt-8 bg-[#181818] rounded-2xl m-auto pt-12">
        <div className="flex flex-wrap items-center gap-40 justify-center">
          <div className="flex flex-col items-center gap-2">
          <Image
            src="/MainImages/Servicesimg/24-hours.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="w-[50px] h-[50px]"
            width={50} 
            height={50}
          />
           
            <span>پشتیبان 24 ساعت</span>
          </div>
          <div className="flex flex-col items-center gap-2">
          <Image
           src="/MainImages/Servicesimg/checked.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="w-[50px] h-[50px]"
            width={50} 
            height={50}
          />
           
            <span>تضمین اصالت کالا</span>
          </div>
          <div className="flex flex-col items-center gap-2">
          <Image
            src="/MainImages/Servicesimg/free-delivery.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="w-[50px] h-[50px]"
            width={50} 
            height={50}
          />
         
            <span>دسترسی سریع</span>
          </div>
          <div className="flex flex-col items-center gap-2">
          <Image
            src="/MainImages/Servicesimg/checked.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="w-[50px] h-[50px]"
            width={50} 
            height={50}
          />
          
            <span>تضمین کیفیت کالا</span>
          </div>
          <div className="flex flex-col items-center gap-2">
          <Image
           src="/MainImages/Servicesimg/secure-payment.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="w-[50px] h-[50px]"
            width={50} 
            height={50}
          />
           
            <span>پرداخت سیستم شاپرک</span>
          </div>
        </div>
      </div>

      <div className="w-[100%] min-h-[400px] mt-8 bg-[#181818] rounded-2xl m-auto flex flex-col items-center py-10">
      <div className="flex items-center gap-3">
  <div
    className={`cursor-pointer w-[120px] h-[100px] rounded-xl flex flex-col items-center justify-center tab-button ${activeTab === 'description' ? 'bg-white text-black' : 'bg-[#181818] border text-white shadow-lg'}`}
    onClick={() => setActiveTab('description')}
  >
    <MdOutlineDescription className="text-4xl" />
    <span>توضیحات</span>
  </div>
  <div
    className={`cursor-pointer w-[120px] h-[100px] rounded-xl flex flex-col items-center justify-center tab-button ${activeTab === 'reviews' ? 'bg-white text-black' : 'bg-[#181818] border text-white shadow-lg'}`}
    onClick={() => setActiveTab('reviews')}
  >
    <PiChatCircleTextLight className="text-4xl" />
    <span>نظر کاربران</span>
  </div>
</div>


        
        {activeTab === 'description' && (
          <div className="mt-4 text-gray-700">
            <h1 className="text-white pr-10 text-2xl">توضیحات :</h1>
            <p className="px-10 text-md text-gray-200 leading-[30px] mt-8">آیفون صفحه‌کلید ندارد و تنها از یک کلید home برخوردار است که با فشردن آن کاربر به صفحه اصلی یا خانه منتقل می‌شود. بعد از معرفی آیفون ۷ این کلید لمسی شد و پس از معرفی آیفون ایکس به کلی از آیفون حذف شد و تنها دو گوشی آیفون اس‌ای ۲ و آیفون اس‌ای ۳ بودند که با این که بعد از آیفون ایکس معرفی و عرضه شدند، اما همچنان از کلید home بهره می‌بردند. آیفون از صفحه حساس لمسی بهره می‌گیرد، که می‌توان با آن تایپ کرد، شماره گرفت و برنامه‌های گوناگون مبتنی بر وب و سیستم‌عامل آی‌اواس، را اجرا کرد. نخستین بار شرکت اپل در تاریخ ۲۹ ژوئن سال ۲۰۰۷ میلادی آیفون را روانه بازارهای آمریکا کرد. در این روز بسیاری از علاقه‌مندان با تشکیل صف‌های طولانی در برابر محصولات خارجی‌های اپل و شرکت ای‌تی اند تی در صف ایستادند تا جزو اولین کسانی باشند که این گوشی را می‌خرند. همچنین این گوشی از سال ۲۰۰۸، در بازارهای جهانی نیز عرضه شد. هدف‌گذاری اپل، فروش ۱۰ میلیون واحد از این دستگاه بود.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="mt-4 text-white">
            <div className="flex flex-wrap justify-center 3lg:gap-x-20 gap-y-7 pt-10">
            <div className="flex flex-col gap-5 items-start px-7">
      <div className="flex items-center gap-1">
        <TfiPencilAlt className="text-white text-xl" />
        <h1 className="text-md">دیدگاه خود را بنویسید</h1>
      </div>
      <span className="text-gray-200">لطفا هر فیلد را کامل پر کنید و اطلاعات خود را به درستی وارد نمایید *</span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-start rounded-md px-2 py-2">
        <span className="text-md text-gray-200">امتیاز دهی *</span>
        <StarRating rating={rating} setRating={setRating} />

        <div className="flex flex-col items-start gap-1">
          <span>دیدگاه شما *</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="sm:w-[600px] xs:w-[350px] bg-[#181818] flex border border-gray-300 rounded-md pr-2"
            rows="4"
          />
        </div>
        <div className="flex items-center gap-16">
          <div className="flex flex-col items-start gap-1">
            <span>نام *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:w-[270px] xs:w-[150px] h-[50px] bg-[#181818] flex border border-gray-300 rounded-md pr-2"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span>ایمیل *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sm:w-[270px] xs:w-[150px] h-[50px] bg-[#181818] flex border border-gray-300 rounded-md pr-2"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="bg-white text-black rounded-md w-[66px] h-[45px]">
            ثبت
          </button>
        </div>
      </form>
    </div>
              
              <div className="border rounded-xl flex flex-col items-start pt-4 px-3">
                <h1 className="text-white text-md">نظرات ثبت شده کاربران :</h1>
                <div className="bg-[#121212] shadow shadow-white rounded-xl xs:w-[350px] sm:w-[600px] h-[160px] mt-3">
                <div className="  flex items-center mt-3 justify-between px-9">
                  <div className="flex gap-5 items-center"> 
                <FaCircleUser className="text-[50px] text-black bg-white rounded-full p-1" />
                <div>
                  <span>علی خداپرست</span>
                </div>
                </div>
                <div className="flex  gap-0.5 text-white text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                </div>
                </div>
                <div className="flex items-center justify-start border-t border-gray-300 px-5 w-[80%] mx-auto mt-2">
                    <span className="mt-7">یکی از بهترین  ها بود از خریدم خیلی راضیم و پیشنهاد میکنم</span>
                </div>
                </div>
                <div className="bg-[#121212] shadow shadow-white rounded-xl mb-5 xs:w-[350px] sm:w-[600px] min-h-[160px] mt-3">
                <div className="  flex items-center mt-3 justify-between px-9">
                  <div className="flex gap-5 items-center"> 
                <FaCircleUser className="text-[50px] text-black bg-white rounded-full p-1" />
                <div>
                  <span>امیر اقایی</span>
                </div>
                </div>
                <div className="flex  gap-0.5 text-white text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                </div>
                </div>
                <div className="flex items-center justify-start border-t border-gray-300 px-5 w-[80%] mx-auto mt-2">
                    <span className="mt-7">خوب بود من توی تخفیف خریدم فروشنده کالا رو خیلی خوب بسته بندی کرده بود</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
     
      <div className="mt-20 w-[95%] mx-auto flex gap-10 bg-[#151515] rounded-xl">
      <OffersPage/>
   <ProductsSlider/>
   </div>
           
           
       
    
      </div>
    </div>
 
  </>
  );
};



