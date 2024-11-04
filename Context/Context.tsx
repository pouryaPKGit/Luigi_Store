"use client";
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// تعریف نوع User
interface User {
  id: number;
  username: string; // افزودن username
  email: string;
  phone: string;
  password: string;
}

// تعریف نوع Props
interface UserProviderProps {
  children: ReactNode;
}

// تعریف نوع Product
export interface Product {
  id: number; // یا string بر اساس نوع id
  img: string;
  name: string;
  price: number; // یا string اگر قیمت شامل واحد باشد
  quantity: number; // تعداد محصول
}

// تعریف نوع Context
interface UserContextType {
  user: User | null;
  error: string | null;
  cart: Product[];
  totalPrice: number;
  likes: Product[];
  registerUser: (userData: Omit<User, 'id'>) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  addToCart: (product: Product) => void;
  updateUser: (updatedUserData: Partial<User>) => void;
  updateUserHandler: (updatedUserData: Partial<User>) => void;
  addToLikes: (product: Product) => void;
  removeFromLikes: (product: Product) => void;
  updateCartItemQuantity: (productId: number, delta: number) => void;
  removeFromCart: (product: Product) => void;
}

// تعریف مقادیر پیش‌فرض برای Context
const defaultContext: UserContextType = {
  user: null,
  error: null,
  cart: [],
  totalPrice: 0,
  likes: [],
  registerUser: () => { },
  loginUser: async () => false,
  logoutUser: () => { },
  addToCart: () => { },
  updateUser: () => { },
  updateUserHandler: () => { },
  addToLikes: () => { },
  removeFromLikes: () => { },
  updateCartItemQuantity: () => { },
  removeFromCart: () => { },
};

// ایجاد Context
export const UserContext = createContext<UserContextType>(defaultContext);


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [likes, setLikes] = useState<Product[]>([]);
  const router = useRouter();

  // تعریف تابع updateUser برای به‌روزرسانی اطلاعات کاربر
  const handleUserUpdate = (updatedUserData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedUserData };
      setUser(updatedUser);
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد.");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: 'کاربری یافت نشد.',
      });
    }
  };
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      loadCart(parsedUser.id);
      loadLikes(parsedUser.id);
    }
  }, []);

  const loadCart = (userId: number) => {
    const storedCart = localStorage.getItem(`cart_${userId}`);
    const storedTotalPrice = localStorage.getItem(`totalPrice_${userId}`);

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }

    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    } else {
      setTotalPrice(0);
    }
  };

  const loadLikes = (userId: number) => {
    const storedLikes = localStorage.getItem(`likes_${userId}`);

    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    } else {
      setLikes([]);
    }
  };

  const registerUser = async (userData: { username: string; email: string; phone: string; password: string }): Promise<void> => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
        setError('ایمیل قبلاً ثبت شده است.');
        toast.error('ایمیل قبلاً ثبت شده است.', {
            position: "top-center",
            autoClose: 2000,
        });
        return;
    }

    if (!userData.email || !userData.password) {
        setError('ایمیل و رمز عبور الزامی هستند.');
        toast.error('ایمیل و رمز عبور الزامی هستند.', {
            position: "top-center",
            autoClose: 2000,
        });
        return;
    }

    const newUser: User = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setUser(newUser);
    setError(null);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('ثبت‌نام موفقیت‌آمیز بود!', {
        position: "top-center",
        autoClose: 1500,
    });
    router.push('/');
};


  const loginUser = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (existingUser) {
        setUser(existingUser);
        setError(null);
        localStorage.setItem('user', JSON.stringify(existingUser));
        loadCart(existingUser.id);
        loadLikes(existingUser.id);
        toast.success('ورود موفقیت‌آمیز بود!', {
          position: "top-center",
          autoClose: 1500,
        });
        router.push('/');
        resolve(true);
      } else {
        setError('ایمیل یا رمز عبور اشتباه است.');
        toast.error('ایمیل یا رمز عبور اشتباه است.', {
          position: "top-center",
          autoClose: 2000,
        });
        resolve(false);
      }
    });
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
      localStorage.removeItem(`totalPrice_${user.id}`);
      localStorage.removeItem(`likes_${user.id}`);
    }

    setUser(null);
    setError(null);
    setCart([]);
    setTotalPrice(0);
    setLikes([]);
    localStorage.removeItem('user');

    toast.info('شما با موفقیت خارج شدید.', {
      position: "top-center",
      autoClose: 1500,
    });
    router.push('/');
  };

  const addToCart = (product: Product) => {
    if (!user) {
      Swal.fire('خطا', 'ابتدا وارد حسابتان شوید.', 'warning');
      return;
    }

    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity! + 1 } // استفاده از ! برای اعلام اینکه quantity وجود دارد
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    const updatedTotalPrice = updatedCart.reduce(
      (acc, item) => acc + parseFloat(item.price.toString()) * (item.quantity || 0),
      0
    );

    setCart(updatedCart);
    setTotalPrice(updatedTotalPrice);

    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    localStorage.setItem(`totalPrice_${user.id}`, updatedTotalPrice.toString());

    toast.success('محصول به سبد خرید اضافه شد!', {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const updateUser = (updatedUserData: Partial<User>) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedUsers = users.map(u =>
      u.id === user!.id ? { ...u, ...updatedUserData } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedUser = { ...user!, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    toast.success('اطلاعات با موفقیت ذخیره شد!', {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const addToLikes = (product: Product) => {
    if (!user) {
      Swal.fire('خطا', 'ابتدا وارد حسابتان شوید.', 'warning');
      return;
    }

    const isAlreadyLiked = likes.some(item => item.id === product.id);

    if (isAlreadyLiked) {
      Swal.fire('خطا', 'این محصول قبلاً به علاقه‌مندی‌ها اضافه شده است.', 'warning');
      return;
    }

    const updatedLikes = [...likes, product];
    setLikes(updatedLikes);
    localStorage.setItem(`likes_${user.id}`, JSON.stringify(updatedLikes));

    toast.success('محصول به علاقه‌مندی‌ها اضافه شد!', {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const removeFromLikes = (product: Product) => {
    if (!user) {
      Swal.fire('خطا', 'ابتدا وارد حسابتان شوید.', 'warning');
      return;
    }

    const existingProduct = likes.find(item => item.id === product.id);
    if (!existingProduct) {
      Swal.fire('خطا', 'این محصول در علاقه‌مندی‌های شما موجود نیست.', 'warning');
      return;
    }

    const updatedLikes = likes.filter(item => item.id !== product.id);
    setLikes(updatedLikes);
    localStorage.setItem(`likes_${user.id}`, JSON.stringify(updatedLikes));

    toast.success('محصول از علاقه‌مندی‌ها حذف شد!', {
      position: "top-center",
      autoClose: 1000,
    });
  };
  
  const removeFromCart = (product: Product) => {
    if (!user) {
        Swal.fire('خطا', 'ابتدا وارد حسابتان شوید.', 'warning');
        return;
    }

    const existingProduct = cart.find(item => item.id === product.id);
    if (!existingProduct) {
        Swal.fire('خطا', 'این محصول در سبد خرید شما وجود ندارد.', 'warning');
        return;
    }

    // بررسی وجود quantity و کاهش یا حذف آن
    let updatedCart;
    if (existingProduct.quantity && existingProduct.quantity > 1) {
        updatedCart = cart.map(item =>
            item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) - 1 }
                : item
        );
    } else {
        updatedCart = cart.filter(item => item.id !== product.id);
    }

    // محاسبه‌ی قیمت کل
    const updatedTotalPrice = updatedCart.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0); // استفاده از quantity به صورت ایمن

    // بروزرسانی سبد خرید و قیمت کل
    setCart(updatedCart);
    setTotalPrice(updatedTotalPrice);

    // بروزرسانی localStorage
    console.log("Final cart and price:", updatedCart, updatedTotalPrice);
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    localStorage.setItem(`totalPrice_${user.id}`, updatedTotalPrice.toString());

    toast.success('محصول از سبد خرید حذف شد!', {
        position: "top-center",
        autoClose: 2000,
    });
};

  const updateCartItemQuantity = (productId: number, delta: number) => {
    if (!user) {
      Swal.fire('خطا', 'ابتدا وارد حسابتان شوید.', 'warning');
      return;
    }

    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 0) + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return item;
    });

    const updatedTotalPrice = updatedCart.reduce(
      (acc, item) => acc + parseFloat(item.price.toString()) * (item.quantity || 0),
      0
    );

    setCart(updatedCart);
    setTotalPrice(updatedTotalPrice);

    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    localStorage.setItem(`totalPrice_${user.id}`, updatedTotalPrice.toString());

    if (delta > 0) {
      toast.success('تعداد محصول افزایش یافت!', {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      toast.success('تعداد محصول کاهش یافت!', {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <UserContext.Provider
    value={{
      user,
      error,
      cart,
      totalPrice,
      likes,
      registerUser,
      loginUser,
      logoutUser,
      addToCart,
      updateUser, // این تابع اصلی را نگه دارید
      updateUserHandler: handleUserUpdate, // حالا این قابل قبول است
      addToLikes,
      removeFromLikes,
      updateCartItemQuantity,
      removeFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
