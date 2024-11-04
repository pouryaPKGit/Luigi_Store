"use client";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";

// تعریف نوع برای UserContext
interface UserContextType {
  totalPrice: number;
}

const ContinuBuying = () => {
  const context = useContext(UserContext) as UserContextType; // اینجا را تغییر دهید

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const {  totalPrice } = context;

  const [selectedDay, setSelectedDay] = useState<string | null>(null); 

  const shippingCost = 10000; // هزینه ارسال به صورت عدد
  const totalWithShipping = totalPrice + shippingCost; 

  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"];

  const handleDayClick = (day: string) => {
    setSelectedDay(day); 
  };

  return (
    <>
      <div className="flex h-screen flex-wrap gap-y-6 gap-x-10 items-start xs:justify-center px-10 my-10">
        <form action="">
          <div className="bg-[#181818] lg:w-[1000px] sm:w-[600px] xs:w-[400px] min-h-[85vh] pb-10 shadow-lg rounded-2xl ">
            <div className="flex items-center justify-center mt-3 bg-[#121212] border text-white h-[50px] rounded-t-xl">
              <h1 className="">اطلاعات خودرا وارد نمایید</h1>
            </div>  
            <div className="flex flex-wrap justify-center px-10 gap-x-5 gap-y-8 pt-10 text-sm text-white">
              <div>
                <span>نام:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg placeholder:p-1 outline-none placeholder:text-black border text-white pr-3 border-gray-300" type="text" />
              </div>
              <div>
                <span>نام خانوادگی:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg placeholder:p-1 outline-none text-white pr-3 placeholder:text-black border border-gray-300" type="text" />
              </div>
              <div>
                <span>ایمیل:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg placeholder:p-1 outline-none text-white pr-3 placeholder:text-black border border-gray-300" type="text" />
              </div>
              <div>
                <span>شماره تماس:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg outline-none placeholder:p-1 text-white pr-3 placeholder:text-black border border-gray-300" type="text" />
              </div>
              <div>
                <span>کد پستی:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg outline-none placeholder:p-1 text-white pr-3 placeholder:text-black border border-gray-300" type="text" />
              </div>
              <div>
                <span>شماره منزل:</span>
                <br />
                <input className="sm:w-[400px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg outline-none placeholder:p-1 text-white pr-3 placeholder:text-black border border-gray-300" type="text" />
              </div>
              <div>
                <span>آدرس:</span>
                <br />
                <input className="lg:w-[805px] sm:w-[380px] xs:w-[330px] mt-2 h-[40px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg placeholder:p-1 text-white pr-3 outline-none placeholder:text-black border border-gray-300" type="text" />
              </div>
              <br />
              <div>
                <span>توضیحات:</span>
                <br />
                <input className="lg:w-[845px] sm:w-[400px] xs:w-[330px] mt-2 h-[150px] bg-[#181818] shadow-lg placeholder:pr-2 rounded-lg placeholder:p-1 text-white pr-3 outline-none placeholder:text-black border border-gray-300" type="text" />
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-y-5 pt-4">
          <div className="bg-[#181818] w-[350px] h-[350px] rounded-xl shadow-lg">
            <h1 className="bg-[#121212] border rounded-t-xl h-[40px] text-white flex items-center justify-center text-sm">
              انتخاب تاریخ ارسال
            </h1>
            <div className="text-sm grid grid-cols-3 justify-items-center gap-y-5 pt-5 ">
              {days.map((day, index) => (
                <span
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`cursor-pointer hover:opacity-50 w-20 h-8 rounded-xl  flex items-center justify-center ${
                    selectedDay === day ? " border-2 duration-500 border-white  " : "bg-white text-[#000000]"
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center mt-5 h-[40px] w-[100%] m-auto  text-white text-sm">
              <h1 className="bg-white text-[#000000] rounded-xl p-3">انتخاب روش ارسال</h1>
            </div>
            <div className="flex flex-col text-sm pt-5">
              <span className="bg-white duration-300 text-[#000000] cursor-pointer h-[30px] flex w-[80%] m-auto rounded-lg items-center justify-center hover:opacity-50">ارسال با پست</span>
              <span className="bg-white duration-300 text-[#000000] cursor-pointer h-[30px] flex w-[80%] m-auto rounded-lg mt-3 items-center justify-center hover:opacity-50">ارسال با پست پیشتاز</span>
            </div>
          </div>

          <div className="bg-[#181818] w-[350px] h-[250px] rounded-xl shadow-lg">
            <h1 className="flex justify-center bg-[#121212] border text-white rounded-t-xl h-[50px] items-center">
              محاسابت سبد خرید شما
            </h1>
            <div className="flex gap-10 justify-center text-md text-white pt-10">
              <div className="flex flex-col gap-3 items-start">
                <span className="text-white">قیمت کل :</span>
                <span className="text-white">هزینه ارسال :</span>
                <span className="text-white">قیمت مجموع :</span>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <span>{totalPrice.toLocaleString()} تومان</span>
                <span>{shippingCost.toLocaleString()} تومان</span> 
                <span>{totalWithShipping.toLocaleString()} تومان</span> 
              </div>
            </div>
            <div>
              <span className="text-[#000000] duration-300 font-bold text-sm bg-white flex items-center justify-center w-[200px] h-[35px] hover:opacity-70 m-auto rounded-md mt-5 shadow-md cursor-pointer">
                تصویه حساب
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContinuBuying;
