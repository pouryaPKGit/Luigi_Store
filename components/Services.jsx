import Image from "next/image";
const Services = () => {
  return (
    <div className="flex flex-wrap gap-28 mx-auto mt-28  justify-center">
      <div className="flex items-center gap-5">
        <Image
          src="/MainImages/Servicesimg/free-delivery.png"
          alt="Description of the image"
          className="sm:w-[80px] sm:h-[80px]"
          priority={true}
          width={50}
          height={50}
        />

        <div className="flex flex-col gap-1">
          <span className="sm:text-lg text-sm">ارسال رایگان</span>
          <span className="text-xs text-gray-400">بدون محدودیت قیمت</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Image
          src="/MainImages/Servicesimg/24-hours.png"
          alt="Description of the image"
          className="sm:w-[80px] sm:h-[80px]"
          priority={true}
          width={50}
          height={50}
        />

        <div className="flex flex-col gap-1">
          <span className="sm:text-lg text-sm">پشتیبانی حرفه ای</span>
          <span className="text-xs text-gray-400">24 ساعت و 7 روز هفته</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Image
          src="/MainImages/Servicesimg/checked.png"
          alt="Description of the image"
          className="sm:w-[80px] sm:h-[80px]"
          priority={true}
          width={50}
          height={50}
        />

        <div className="flex flex-col gap-1">
          <span className="sm:text-lg text-sm">اصالت کالا</span>
          <span className="text-xs text-gray-400">تضمین برگشت پول</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Image
        
          src="/MainImages/Servicesimg/secure-payment.png"
          className="sm:w-[80px] sm:h-[80px]"
          alt="Description of the image"
          priority={true}
          width={50}
          height={50}
        />

        <div className="flex flex-col gap-1">
          <span className="sm:text-lg text-sm">امنیت در خرید</span>
          <span className="text-xs text-gray-400">کارت های عضو شتاب</span>
        </div>
      </div>
    </div>
  );
};

export default Services;
