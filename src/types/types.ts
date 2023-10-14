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
  referralSelfId: number;
  role: string;
}
