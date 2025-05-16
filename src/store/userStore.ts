import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // імпортуємо devtools

export interface IUser {
  name: string;
  email: string;
  avatarURL?: string;
  birthday: string;
  phone: string;
  telegram: string;
}

interface UserState {
  user: IUser | null;
  isUserLoading: boolean;
  setUser: (user: IUser | null) => void;
  setUserLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    set => ({
      user: null,
      isUserLoading: false,
      setUser: user => set({ user }),
      setUserLoading: isLoading => set({ isUserLoading: isLoading }),
    }),
    { name: 'user-store' },
  ),
);
