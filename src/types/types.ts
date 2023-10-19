import { useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>;

export interface IAdmin {
  id: number;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  photo: string;
  role: string;
}

export interface IUser {
  id: number;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  photo: string;
  referral: string;
  referralSelfId: string;
  walletId: string;
  addressId: string;
  shippingId: string;
  role: string;
}

export interface IWallet {
  id: string;
  userId: number;
  balance: number;
  history: IWalletHistory[];
}

export interface IWalletHistory {
  id: number;
  date: string;
  amount: number;
}

export interface IUserAddress {
  id: string;
  userId: number;
  addressList: IAddress[];
}

export interface IAddress {
  id: number;
  address: string;
  city: string;
  province: string;
  zip: string;
}

export interface IShippingData {
  id: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  start: IAddress;
  destAddress: string;
  destCity: string;
  destProvince: string;
  destZip: string;
  category: string;
  description: string;
  date: string;
  insurance: boolean;
  sameDay: boolean;
  twoDay: boolean;
  alreadyPaid: boolean;
}

export function useDebounce<Func extends (...args: any[]) => void>(
  func: Func,
  delay = 1000
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction: Func = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}
