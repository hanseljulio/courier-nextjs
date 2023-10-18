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

export type DeepPartial<K> = {
  [attr in keyof K]?: K[attr] extends object ? DeepPartial<K[attr]> : K[attr];
};

export interface IShippingData {
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
  insurance: boolean;
  sameDay: boolean;
  twoDay: boolean;
}
