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
