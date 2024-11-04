"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/Context"; 
import { useRouter } from 'next/navigation';

// تعریف نوع Props برای FormContent
interface FormContentProps {
  isSignup: boolean;
  setIsSignup: (value: boolean) => void;
  registerUser: (userData: { username: string; email: string; phone: string; password: string }) => void;
  loginUser: (email: string, password: string) => Promise<boolean>; // تغییر به boolean
}

const AuthForm: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true); // مدیریت حالت ورود یا ثبت نام
  const { registerUser, loginUser } = useContext(UserContext); // استفاده از کانتکست برای عملیات ورود و ثبت‌نام

  const imageClass = isSignup ? "slide-left" : "slide-right"; // انیمیشن برای جابجایی تصویر

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-black shadow-md shadow-white rounded-2xl flex justify-center flex-1">
        {isSignup ? (
          <>
            <div className={`flex-1 rounded-2xl text-center hidden md:flex ${imageClass}`}>
              <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                <Image
                  src="/images/astronaut-8061095_640.webp"
                  alt="Description of the image"
                  priority={true}
                  className="flex items-center justify-center mx-auto shadow-md shadow-white opacity-85 rounded-full "
                  width={500} 
                  height={500}
                />
              </div>
            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <FormContent isSignup={isSignup} setIsSignup={setIsSignup} registerUser={registerUser} loginUser={loginUser} />
            </div>
          </>
        ) : (
          <>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <FormContent isSignup={isSignup} setIsSignup={setIsSignup} registerUser={registerUser} loginUser={loginUser} />
            </div>
            <div className={`flex-1 rounded-2xl text-center hidden md:flex ${imageClass}`}>
              <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                <Image
                  src="/images/Untitled-1.png2222.png"
                  alt="Description of the image"
                  priority={true}
                  className="flex items-center justify-center mx-auto shadow-md shadow-white rounded-full p-5"
                  width={500} 
                  height={500}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FormContent: React.FC<FormContentProps> = ({ isSignup, setIsSignup, registerUser, loginUser }) => {
  const router = useRouter(); // برای هدایت کاربران پس از ورود یا ثبت‌نام
  const [username, setUsername] = useState<string>(''); // مدیریت فیلد نام کاربری
  const [email, setEmail] = useState<string>(''); // مدیریت فیلد ایمیل
  const [phone, setPhone] = useState<string>(''); // مدیریت فیلد شماره تلفن
  const [password, setPassword] = useState<string>(''); // مدیریت فیلد رمز عبور

  // تابعی برای اعتبارسنجی ایمیل
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // تابعی که برای ثبت فرم استفاده می‌شود
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    if (isSignup) {
      // عملیات ثبت نام
      if (!validateEmail(email)) {
        Swal.fire({
          icon: 'error',
          title: 'ایمیل معتبر نیست!',
          text: 'لطفاً ایمیل خود را به درستی وارد کنید.',
          confirmButtonText: 'باشه',
        });
        return;
      }
      try {
        await registerUser({ username, email, phone, password });
        router.push("/"); // هدایت به صفحه اصلی پس از ثبت نام موفق
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'خطا در ثبت نام',
          text: 'لطفاً دوباره تلاش کنید.',
          confirmButtonText: 'باشه',
        });
      }
    } else {
      // عملیات ورود
      if (!validateEmail(email)) {
        Swal.fire({
          icon: 'error',
          title: 'ایمیل معتبر نیست!',
          text: 'لطفاً ایمیل خود را به درستی وارد کنید.',
          confirmButtonText: 'باشه',
        });
        return;
      }
      try {
        await loginUser(email, password);
        router.push("/"); // هدایت به صفحه اصلی پس از ورود موفق
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'خطا در ورود',
          text: 'لطفاً دوباره تلاش کنید.',
          confirmButtonText: 'باشه',
        });
      }
    }
  };
  

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <div className="text-center">
        <h1 className="text-2xl xl:text-4xl font-extrabold text-white">
          {isSignup ? 'فرم ثبت نام' : 'فرم ورود'}
        </h1>
        <p className="text-[12px] text-gray-300 mt-4 text-md">
          {isSignup ? 'لطفاً اطلاعات خود را وارد کنید تا حساب کاربری خود را ایجاد کنید' : 'خوش آمدید! لطفاً وارد حساب کاربری خود شوید'}
        </p>
      </div>
      <div className="w-full flex-1 mt-8">
        <div className="mx-auto max-w-xs flex flex-col gap-4">
          {isSignup && (
            <input
              dir="rtl"
              className="w-full px-5 py-3 rounded-lg font-medium bg-black border border-white placeholder-white text-sm focus:outline-none focus:border-gray-400 text-right"
              type="text"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={4}
              maxLength={16}
              required
            />
          )}
          <input
            dir="rtl"
            className="w-full px-5 py-3 rounded-lg font-medium bg-black border border-white placeholder-white text-sm focus:outline-none focus:border-gray-400 text-right"
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isSignup && (
            <input
              dir="rtl"
              className="w-full px-5 py-3 rounded-lg font-medium bg-black border border-white placeholder-white text-sm focus:outline-none focus:border-gray-400 text-right"
              type="text"
              placeholder="شماره موبایل"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
              required
            />
          )}
          <input
            dir="rtl"
            className="w-full px-5 py-3 rounded-lg font-medium bg-black border border-white placeholder-white text-sm focus:outline-none focus:border-gray-400 text-right"
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
            required
          />
          <button
            type="submit"
            className="mt-5 w-full px-5 py-1 text-lg bg-white shadow-md shadow-white hover:opacity-65 duration-300 text-black rounded-lg font-medium"
          >
            {isSignup ? 'ثبت نام' : 'ورود'}
          </button>
          <p className="mt-3 text-sm text-gray-400">
            {isSignup ? (
              <>
                آیا حساب کاربری دارید؟{' '}
                <button type="button" className="text-white" onClick={() => setIsSignup(false)}>
                  ورود به حساب
                </button>
              </>
            ) : (
              <>
                حساب کاربری ندارید؟{' '}
                <button type="button" className="text-white" onClick={() => setIsSignup(true)}>
                  ثبت نام
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
