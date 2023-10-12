import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface LoginState {
  email: string;
  setEmail: (newEmail: string) => void;
  password: string;
  setPassword: (newPassword: string) => void;
  isAdmin: boolean;
  setIsAdmin: (adminState: boolean) => void;
}

export const useStoreLoginPersist = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        email: "",
        setEmail: (newEmail) => set({ email: newEmail }),
        password: "",
        setPassword: (newPassword) => set({ password: newPassword }),
        isAdmin: false,
        setIsAdmin: (adminState) => set({ isAdmin: adminState }),
      }),
      { name: "loginStore" }
    )
  )
);
