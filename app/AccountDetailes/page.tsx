"use client"
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { FaUserCog, FaUserEdit, FaBoxOpen } from "react-icons/fa";
import { PiTimer } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { UserContext } from "../../Context/Context";
import {  ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation'; // به جای 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { BsChatSquareText } from "react-icons/bs";
import { IoIosWallet } from "react-icons/io";


interface UserInfo {
  username: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  address: string;
  postalCode: string;
  homePhone: string;
}

interface UserContextType {
  user: UserInfo | null;
  updateUser: (userInfo: UserInfo) => void;
  logoutUser: () => void;
}

const AccountDetails: React.FC = () => {
  const router = useRouter();
  const { user, updateUser, logoutUser } = useContext(UserContext) as UserContextType;


  const [activeMenu, setActiveMenu] = useState<string>("profile");

  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    email: "",
    phone: "",
    password: "",
    fullName: "",
    address: "",
    postalCode: "",
    homePhone: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
        fullName: user.fullName || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
        homePhone: user.homePhone || "",
      });
    }
  }, [user]);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (updateUser) {
      updateUser(userInfo);
    }
  };

  const handleLogout = () => {
    router.push('/');
    if (logoutUser) {
      logoutUser();
    }
  };
  return (
    <>
    <div className="flex flex-wrap-reverse items-end justify-center gap-x-5 gap-y-5  my-10 mx-10">
     
      <div className="bg-[#181818]  rounded-2xl  w-[400px]  h-[500px]">
        <h1 className="flex items-center justify-center text-xl text-white mt-3">
          پروفایل کاربری من
        </h1>
        <hr className="mt-2" />
        <div className="flex flex-col pt-7 items-center justify-center  gap-y-3 ">
          <div
            onClick={() => handleMenuClick("profile")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "profile" ? "bg-white text-black " : "text-white"
            }`}
          >
            <FaUserCog className="text-2xl " />
            <span>پروفایل</span>
          </div>
          <div
            onClick={() => handleMenuClick("editProfile")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "editProfile" ? "bg-white text-black " : "text-white"
            }`}
          >
            <FaUserEdit className="text-2xl" />
            <span>ویرایش پروفایل</span>
          </div>
          <div
            onClick={() => handleMenuClick("delivered")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "delivered" ? "bg-white text-black " : "text-white"
            }`}
          >
            <FaBoxOpen className=" text-2xl" />
            <span>تحویل داده شده</span>
          </div>
          <div
            onClick={() => handleMenuClick("processing")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px]   h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "processing" ? "bg-white text-black " : "text-white"
            }`}
          >
            <PiTimer className=" text-2xl" />
            <span>در حال پردازش</span>
          </div>
          <div
            onClick={() => handleMenuClick("cancelled")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "cancelled" ? "bg-white text-black " : "text-white"
            }`}
          >
            <MdCancel className=" text-2xl" />
            <span>لغو شده</span>
          </div>
          <div
            onClick={() => handleMenuClick("ticket")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "ticket" ? "bg-white text-black " : "text-white"
            }`}
          >
             
            <BsChatSquareText className=" text-2xl" />
            <span>تیکت ها</span>
          </div>
          <div
            onClick={() => handleMenuClick("wallet")}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "wallet" ? "bg-white text-black " : "text-white"
            }`}
          >
            <IoIosWallet className=" text-2xl" />
            <span>کیف پول</span>
          </div>
          <div
            onClick={handleLogout}
            className={`flex items-center  px-2 sm:w-[350px] xs:w-[300px] h-[40px] border-gray-200 border rounded-xl shadow-sm gap-1 cursor-pointer ${
              activeMenu === "logout" ? "bg-white text-black " : "text-white"
            }`}
          >
            <IoLogOutOutline className="text-2xl " />
            <span className="">خروج از حساب</span>
          </div>
          
        </div>
      </div>

     
      <div className="bg-[#181818]  rounded-2xl  w-[1000px] pb-5 min-h-[500px]">
        <h1 className="text-white text-xl font-serif mt-2 mr-2">
          اطلاعات کاربری
        </h1>
        <hr className="border border-white w-[120px] mr-2" />
        <hr className="mt-2 border border-white w-[200px] mr-2" />
        {activeMenu === "profile" && (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 mt-10">
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">نام کاربری :</span>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                className="sm:sm:w-[400px] xs:w-[300px]  rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">ایمیل :</span>
              <input
                type="text"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">شماره تماس :</span>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">رمز عبور:</span>
              <input
                type="number"
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">نام کامل :</span>
              <input
              placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">آدرس :</span>
              <input
               placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">کد پستی :</span>
              <input
               placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="postalCode"
                value={userInfo.postalCode}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">تلفن منزل :</span>
              <input
               placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="homePhone"
                value={userInfo.homePhone}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                readOnly
              />
            </div>
          </div>
        )}

        {activeMenu === "editProfile" && (
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 mt-10">
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">نام کاربری :</span>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">ایمیل :</span>
              <input
                type="text"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">شماره تماس :</span>
              <input
                type="number"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">رمز عبور:</span>
              <input
                type="number"
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[14px] pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
                
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">نام کامل :</span>
              <input
              placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]    placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">آدرس :</span>
              <input
              placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">کد پستی :</span>
              <input
              placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="number"
                name="postalCode"
                value={userInfo.postalCode}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-sm">تلفن منزل :</span>
              <input
              placeholder="در این بخش چیزی وارد نکرده اید ..."
                type="number"
                name="homePhone"
                value={userInfo.homePhone}
                onChange={handleInputChange}
                className="sm:w-[400px] xs:w-[300px] rounded-md h-[40px]   placeholder:text-[12px] placeholder:text-white pr-2 outline-none bg-[#121212] shadow-sm shadow-white"
              />
            </div>
            <div className="">
              <button
                onClick={handleSaveChanges}
                className="bg-white  px-4 py-2 rounded-md  text-[#000]"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
          
        )}
       {activeMenu === "delivered" && (
        <div className="flex flex-wrap gap-y-5 mt-2">
          <div className=" lg:w-[900px] sm:w-[600px] m-auto min-h-[200px] rounded-2xl">
              <div className="flex  py-10 justify-center lg:gap-20 gap-x-5 xs:flex-wrap sm:flex-nowrap xs:gap-y-5 sm:gap-y-0  px-10 items-center">
              <Image
            src="/MainImages/Popular/Untitled-1.png17.png"
            alt="Description of the image"
            priority={true} 
            className="w-[150px] h-[150px] mt-10 rounded-2xl" 
            width={500} 
            height={500}
          />
               
                <div className="flex flex-col gap-y-2">
                <span className="text-lg font-semibold ">موس گیمینگ مدل newstar</span>
                <span className=" text-sm">25,000,000 تومان</span>
                </div>
                <div className="flex flex-col gap-y-3">
                <span className="">در تاریخ :</span>
                <span className="text-sm ">1402/10/05</span>
                </div>
              </div>
          </div>
          <div className="  lg:w-[900px] sm:w-[600px] m-auto min-h-[200px]  rounded-2xl">
          <div className="flex  py-10 justify-center lg:gap-28 gap-x-[98px] xs:flex-wrap sm:flex-nowrap xs:gap-y-5 sm:gap-y-0  px-10 items-center">
          <Image
            src="/MainImages/Popular/Untitled-1.png11.png"
            alt="Description of the image"
            priority={true} 
            className="w-[150px] h-[150px] mt-10 rounded-2xl"
            width={500} 
            height={500}
          />
            
            <div className="flex flex-col gap-y-2">
            <span className="text-lg font-semibold ">ایپد اپل مدل new</span>
            <span className=" text-sm">63,000,000 تومان</span>
            </div>
            <div className="flex flex-col gap-y-3">
            <span className="">در تاریخ :</span>
            <span className="text-sm ">1403/5/11</span>
            </div>
          </div>
      </div>
      </div>
          

        )}
        {activeMenu === "processing" && (
          <div  className="flex items-center justify-center">
              <h1 className=" sm:text-2xl xs:text-md mt-40">در حال حاضر درحال پردازشی مشاهده نمیشود!</h1>
          </div>

        )}
        {activeMenu === "cancelled" && (
           <div className="flex flex-col gap-y-5 mt-2">
           <div className="  lg:w-[900px] sm:w-[600px] m-auto min-h-[200px]  rounded-2xl">
               <div className="flex  py-10 justify-center lg:gap-20 gap-x-5 xs:flex-wrap sm:flex-nowrap xs:gap-y-5 sm:gap-y-0  px-10 items-center">
               <Image
            src="/MainImages/Popular/Untitled-1.png1.png"
            alt="Description of the image"
            priority={true} 
            className="w-[150px] h-[150px] mt-10 rounded-2xl"
            width={1000} 
            height={1000}
          />
                
                 <div className="flex flex-col gap-y-2">
                 <span className="text-lg font-semibold  ">موتور برق 17000 مدل تایلندی new</span>
                 <span className=" text-sm">13,500,000 تومان</span>
                 </div>
                 <div className="flex flex-col gap-y-3">
                 <span className="">در تاریخ :</span>
                 <span className="text-sm ">1401/11/05</span>
                 </div>
               </div>
           </div>
           <div className="  lg:w-[900px] sm:w-[600px] m-auto min-h-[200px]  rounded-2xl">
           <div className="flex  py-10 justify-center lg:gap-20 gap-x-5 xs:flex-wrap sm:flex-nowrap xs:gap-y-5 sm:gap-y-0  px-10 items-center">
           <Image
            src="/MainImages/Popular/Untitled-1.png18.png"
            alt="Description of the image"
            priority={true} 
           className="w-[150px] h-[150px] mt-10 rounded-2xl"
            width={500} 
            height={500}
          />
            
             <div className="flex flex-col gap-y-2">
             <span className="text-lg font-semibold ">چکش تخریب برقی 6 کیلویی 10 ژول</span>
             <span className=" text-sm">7,300,000 تومان</span>
             </div>
             <div className="flex flex-col gap-y-3">
             <span className="">در تاریخ :</span>
             <span className="text-sm ">1403/2/15</span>
             </div>
           </div>
       </div>
       </div>

        )}
        {activeMenu === "ticket" && (
          <div  className="flex items-center justify-center">
          <h1 className=" sm:text-2xl xs:text-md mt-40">در حال حاضر تیکتی مشاهده نمیشود!</h1>
      </div>

        )}
        {activeMenu === "wallet" && (
          <div className="flex flex-col items-center mt-16">
           
            <Image
            src="/images/Untitled-1.png2.png"
            alt="Description of the image"
            priority={true} 
            className="w-[300px] flex items-center justify-center m-auto -mt-20"
            width={500} 
            height={500}
          />
            <p className="text-xl font-serif -mt-10">کیف پول شما خالی است</p>
          </div>

        )}
      </div>
      <ToastContainer />
    </div>
   
    </>
  );
}

export default AccountDetails;
