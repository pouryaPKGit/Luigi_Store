"use client";
import { useContext } from "react";
import { UserContext } from "../../Context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { LiaCartPlusSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";

// تایپ محصول
export interface Product {
  id: number; // یا string بر اساس نوع id
  img: string;
  name: string;
  price: number; // یا string اگر قیمت شامل واحد باشد
  quantity: number; // تعداد محصول
}

// نوع UserContext
interface UserContextType {
  cart: Product[];
  totalPrice: number;
  removeFromCart: (product: Product) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC = () => {
  const context = useContext(UserContext) as UserContextType; // اینجا را تغییر دهید

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { cart, totalPrice, removeFromCart, updateCartItemQuantity } = context;

  const handleRemoveClick = (product: Product) => {
    removeFromCart(product);
  };

  const shippingCost = 10000; // هزینه ارسال به عنوان عدد
  const totalWithShipping = totalPrice + shippingCost;

  // توابع افزایش و کاهش تعداد
  const increaseQuantity = (product: Product) => {
    updateCartItemQuantity(product.id, 1);
  };

  const decreaseQuantity = (product: Product) => {
    if (product.quantity > 1) {
      updateCartItemQuantity(product.id, -1);
    } else {
      handleRemoveClick(product);
    }
  };

  return (
    <>
      <div>
        <div className="container mx-auto px-10 pt-20 pb-24">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-y-5">
              <Image
                src="/like/Untitled-222.png"
                alt="Description of the image"
                priority={true} // بهینه‌سازی بیشتر برای تصاویر بالای صفحه
                className="flex items-center justify-center sm:w-[250px] xs:w-[200px] m-auto"
                width={500}
                height={500}
              />
              <p className="text-md text-white font-bold -mt-10">سبد خرید شما خالی است</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-start gap-y-5 justify-center gap-x-5">
              <ul className="space-y-4">
                {cart.map((product: Product, index: number) => (
                  <li key={index} className="flex justify-between items-center p-4 bg-[#181818] lg:w-[1000px] md:w-[700px] sm:w-[500px] xs:w-[400px] shadow-md rounded-lg">
                    <div className="flex gap-5">
                      <div>
                        <Image
                          src={product.img}
                          alt="Description of the image"
                          priority={true}
                          className="w-[100px] h-[100px]"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div>
                        <h2 className="sm:text-lg text-white xs:text-sm">{product.name}</h2>
                        <div className="flex items-center gap-20 pt-7">
                          <p className="text-sm text-gray-200">قیمت محصول : {product.price} تومان</p>
                          <div className="pt-1 text-white text-sm flex items-center gap-2">
                            <button onClick={() => decreaseQuantity(product)} className="bg-black border-2 p-1 rounded-full w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 duration-300">
                              <FaRegTrashCan className="text-xl" />
                            </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increaseQuantity(product)} className="bg-black border-2 p-1 rounded-full w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 duration-300">
                              <LiaCartPlusSolid className="text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveClick(product)} className="text-red-500 hover:text-red-800"></button>
                  </li>
                ))}
              </ul>
              <div className="bg-[#181818] w-[350px] h-[250px] rounded-xl shadow-lg">
                <h1 className="flex justify-center bg-[#202020] shadow-sm text-white rounded-t-xl h-[50px] items-center font-bold">محاسابت سبد خرید شما</h1>
                <div className="flex gap-10 justify-center text-md text-white pt-10">
                  <div className="flex flex-col gap-3 items-start">
                    <span className="text-gray-200 font-bold">قیمت کل :</span>
                    <span className="text-gray-200 font-bold">هزینه ارسال :</span>
                    <span className="text-gray-200 font-bold">قیمت مجموع :</span>
                  </div>
                  <div className="flex flex-col gap-3 items-end">
                    <span>{totalPrice.toLocaleString()} تومان</span>
                    <span>{shippingCost.toLocaleString()} تومان</span>
                    <span>{totalWithShipping.toLocaleString()} تومان</span>
                  </div>
                </div>
                <div>
                  <Link href="/CountinuBuying">
                    <span className="text-black font-semibold duration-300 text-sm bg-white flex items-center justify-center w-[200px] h-[35px] hover:opacity-70 m-auto rounded-md mt-5 shadow-md cursor-pointer">ادامه فرایند خرید</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Cart;
