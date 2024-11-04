"use client";
import Image from "next/image";
import React, { useState, useContext, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { LiaUserCogSolid } from "react-icons/lia";
import { IoIosHeartEmpty } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { useRouter } from "next/navigation"; // تغییر به next/navigation
import { TbShoppingBagDiscount } from "react-icons/tb";
import { CgMenuGridR } from "react-icons/cg";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { LiaPowerOffSolid } from "react-icons/lia";
import { MdMenuOpen } from "react-icons/md";
import { UserContext } from "../Context/Context";
import Link from "next/link";
import Swal from "sweetalert2";

interface NavLinkProps {
  href: string;
  label: string;
  icon: JSX.Element;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon }) => (
  <Link href={href}>
    <li className="hover:text-gray-500  flex items-center gap-2 duration-300 font-semibold  ml-3 pr-3 cursor-pointer ">
      {icon} {label}
    </li>
  </Link>
);

const Navbar: React.FC = () => {
  const { user, cart, likes, logoutUser } = useContext(UserContext) ?? {};
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const handlelogoutUser = (): void => {
    logoutUser?.();
    Swal.fire({
      icon: "success",
      title: "شما با موفقیت خارج شدید!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);
  const scrollToDiscountSection = () => {
    const section = document.getElementById("discount-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#181818] flex gap-5 items-center justify-between lg:px-10 px-5 h-[80px] relative">
      <div>
        <CgMenuGridR
          onClick={toggleMenu}
          className="text-4xl flex lg:hidden cursor-pointer"
        />
        <Link href="/">
          <Image
            src="/images/Untitled-1.png1.png"
            alt="Description of the image"
            priority={true}
            className=" hidden lg:flex cursor-pointer hover:opacity-85 duration-300"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div>
        <ul className="hidden lg:flex gap-5">
          <NavLink
            href="/"
            label="صفحه اصلی"
            icon={<IoHomeOutline className="text-xl" />}
          
          />
          <nav>
            <button onClick={scrollToDiscountSection}>
              <NavLink
                href="#"
                label="تخفیف‌ها"
                icon={<TbShoppingBagDiscount className="text-xl" />}
              />
            </button>
          </nav>

          <NavLink 

            href="/AllProducts"
            label="همه محصولات"
            icon={<LuShoppingBag className="text-xl" />}
          />
          <NavLink
            href="/AboutUs"
            label="درباره ما"
            icon={<FaUsersBetweenLines className="text-xl" />}
          />
        </ul>
      </div>
      <div className="relative">
        <ul className="sm:flex hidden items-center ">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <li
                onClick={toggleUserMenu}
                className="hover:text-gray-500 flex items-center text-3xl bg-white rounded-full text-black gap-2 duration-300 font-semibold cursor-pointer"
              >
                 
                 <LiaUserCogSolid />
              </li>
              {userMenuOpen && (
                <ul className="absolute top-12 -right-10 w-[200px] bg-white text-black rounded-lg shadow-lg p-2 z-10">
                  <li
                    className="hover:bg-gray-200 px-4 py-2 cursor-pointer flex items-center gap-1 duration-300"
                    onClick={() => setUserMenuOpen(false)}
                  >
                     <RiAccountPinCircleLine className="text-xl" />
                    <Link href="/AccountDetailes">
                   
                    جزئیات حساب</Link>
                  </li>
                  <li className="hover:bg-gray-200 duration-300 px-4 py-2 cursor-pointer flex items-center gap-1">
                  <LiaHandsHelpingSolid className="text-xl" />
                    پشتیبانی
                  </li>
                  <li className="hover:bg-gray-200 duration-300 px-4 py-2 cursor-pointer flex items-center gap-1">
                  <HiOutlineChatBubbleLeftRight className="text-xl" />
                    تیکت ها
                  </li>
                  <li
                    className="hover:bg-gray-200 duration-300 px-4 py-2 cursor-pointer flex items-center gap-1"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handlelogoutUser();
                      router.push("/");
                    }}
                  >
                    <LiaPowerOffSolid className="text-xl mt-1" />
                    خروج
                    
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink
              href="/Login"
              label="ورود | ثبت نام"
              icon={<CiLogin className="text-2xl -rotate-180" />}
            />
          )}
          <NavLink
            href="/Likes"
            label=""
            icon={
              <>
                <span className="bg-white rounded-full flex items-center justify-center h-4 w-4 text-gray-600 p-1 text-[12px] -mt-4 -ml-2 font-semibold">
                  {likes?.length}
                </span>
                <IoIosHeartEmpty className="text-2xl cursor-pointer hover:text-gray-500 duration-300" />
              </>
            }
          />
          <NavLink
            href="/ShoppingCart"
            label=""
            icon={
              <>
                <span className="bg-white rounded-full flex items-center justify-center h-4 w-4 text-gray-600 p-1 text-[12px] -mt-4 -ml-2 font-semibold">
                  {cart?.length}
                </span>
                <GiShoppingBag className="text-2xl cursor-pointer" />
              </>
            }
          />
        </ul>
        <Link href="/">
          <Image
            src="/images/Untitled-1.png1.png"
            alt="Description of the image"
            priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
            className="sm:hidden flex cursor-pointer hover:opacity-85 duration-300"
            width={50}
            height={50}
          />
        </Link>
      </div>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 w-[350px] h-screen bg-[#181818] text-white shadow-lg z-50 lg:hidden overflow-y-auto transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <MdMenuOpen
            onClick={toggleMenu}
            className="cursor-pointer text-5xl mt-3 mr-3 rotate-180"
          />
        </div>
        <ul className="flex flex-col mt-5 mr-2 gap-y-4">
          <Link href="/">
            <li
              onClick={closeMenu}
              className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl flex items-center gap-2 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
            >
              <IoHomeOutline className="text-xl" /> صفحه اصلی
            </li>
          </Link>
          <Link href="/AllProducts">
            <li
              onClick={closeMenu}
              className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl flex items-center gap-2 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
            >
              <LuShoppingBag className="text-xl" /> همه محصولات
            </li>
          </Link>
          <nav  className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl flex items-center gap-2 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer">
            <button onClick={scrollToDiscountSection}>
              <NavLink
                href="#"
                label="تخفیف‌ها"
                icon={<TbShoppingBagDiscount className="text-xl" />}
                
              />
            </button>
          </nav>
          <Link href="/AboutUs">
            <li
              onClick={closeMenu}
              className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl flex items-center gap-2 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
            >
              <FaUsersBetweenLines className="text-xl" /> درباره ما
            </li>
          </Link>
          {user ? (
            <>
              {/* اگر کاربر لاگین بود */}
              <Link href="/AccountDetailes">
                <li
                  onClick={closeMenu}
                  className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl sm:hidden flex items-center gap-1 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
                >
                  <CiLogin className="text-2xl" /> جزئیات حساب
                </li>
              </Link>
            </>
          ) : (
            <>
              {/* اگر کاربر لاگین نبود */}
              <Link href="/Login">
                <li
                  onClick={closeMenu}
                  className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl sm:hidden flex items-center gap-1 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
                >
                  <CiLogin className="text-2xl -rotate-180" /> ورود | ثبت نام
                </li>
              </Link>
            </>
          )}
          <Link href="/ShoppingCart">
            <li
              onClick={closeMenu}
              className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl sm:hidden flex items-center gap-2 duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
            >
              <GiShoppingBag className="text-xl" /> سبد خرید
            </li>
          </Link>
          <Link href="/Likes">
            <li
              onClick={closeMenu}
              className="hover:text-gray-500 bg-[#2d2c2c] rounded-xl sm:hidden flex gap-2 items-center duration-300 font-semibold h-10 ml-3 pr-3 cursor-pointer"
            >
              <IoIosHeartEmpty className="text-xl" /> علاقه‌مندی
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
