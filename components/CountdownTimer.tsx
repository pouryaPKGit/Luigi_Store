"use client";
import { useEffect, useState, useCallback } from "react";

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

  // تعریف تابع calculateTimeLeft با استفاده از useCallback
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]); // قرار دادن targetDate به عنوان وابستگی در useCallback

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft()); // فراخوانی تابع calculateTimeLeft
    }, 1000);

    return () => clearInterval(timer); // پاک‌سازی تایمر در پایان
  }, [calculateTimeLeft]); // قرار دادن calculateTimeLeft در آرایه‌ی وابستگی‌ها

  return (
    <div>
      {timeLeft.days !== undefined ? (
        <div className="flex m-auto gap-2 justify-center items-center mt-7">
          <div className="flex flex-col">
            <span className="w-8 h-8 text-white border rounded-md flex items-center justify-center">
              {timeLeft.seconds}
            </span>
            <span className="text-sm text-white bg-black rounded-lg p-2 mt-3">ثانیه</span>
          </div>
          <div className="flex flex-col">
            <span className="w-8 h-8 text-white border rounded-md flex items-center justify-center">
              {timeLeft.minutes}
            </span>
            <span className="text-sm text-white bg-black rounded-lg p-2 mt-3">دقیقه</span>
          </div>
          <div className="flex flex-col">
            <span className="w-8 h-8 text-white border rounded-md flex items-center justify-center">
              {timeLeft.hours}
            </span>
            <span className="text-sm text-white bg-black rounded-lg p-2 mt-3">ساعت</span>
          </div>
          <div className="flex flex-col">
            <span className="w-8 h-8 text-white border rounded-md flex items-center justify-center">
              {timeLeft.days}
            </span>
            <span className="text-sm text-white bg-black rounded-lg p-2 mt-3">روز</span>
          </div>
        </div>
      ) : (
        <span>زمان به پایان رسید!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
