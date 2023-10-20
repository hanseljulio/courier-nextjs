import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface LoginState {
  id: number;
  setId: (newId: number) => void;
  isAdmin: boolean;
  setIsAdmin: (adminState: boolean) => void;
  gameCount: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export const useStoreLoginPersist = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        id: 0,
        setId: (newId) => set({ id: newId }),
        isAdmin: false,
        setIsAdmin: (adminState) => set({ isAdmin: adminState }),
        gameCount: 0,
        increaseCount: () =>
          set((state) => ({ gameCount: state.gameCount + 1 })),

        decreaseCount: () =>
          set((state) => ({ gameCount: state.gameCount - 1 })),
      }),
      { name: "loginStore" }
    )
  )
);
