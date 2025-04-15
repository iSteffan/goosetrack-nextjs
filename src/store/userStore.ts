import { create } from 'zustand';

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
  setUser: (user: IUser | ((prev: IUser | null) => IUser | null)) => void;
  setUserLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>()(set => ({
  user: null,
  isUserLoading: false,
  setUser: user =>
    set(state => ({
      user: typeof user === 'function' ? user(state.user) : user,
    })),
  setUserLoading: isLoading => set({ isUserLoading: isLoading }),
}));
