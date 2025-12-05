import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type UserRole = 'farmer' | 'buyer' | null;

interface UserState {
    role: UserRole;
    isLoggedIn: boolean;
    language: 'en' | 'kn' | 'hi';
    setRole: (role: UserRole) => void;
    login: () => void;
    logout: () => void;
    setLanguage: (lang: 'en' | 'kn' | 'hi') => void;
}

type UserStateCreator = StateCreator<UserState, [["zustand/persist", unknown]]>;

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            role: null,
            isLoggedIn: false,
            language: 'en',
            setRole: (role) => set({ role }),
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false, role: null }),
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'krishi-mitra-storage',
            partialize: (state) => ({
                language: state.language,
                isLoggedIn: state.isLoggedIn,
                role: state.role
            }),
        }
    )
);
