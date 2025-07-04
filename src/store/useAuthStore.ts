import { create } from "zustand";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    role: string | null; // ✅ Add role
    login: (token: string, role: string) => void;
    logout: () => void;
    initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,
    role: null,

    login: (token: string, role: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        set({ token, isAuthenticated: true, role });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        set({ token: null, isAuthenticated: false, role: null });
    },

    initAuth: () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
            set({ token, isAuthenticated: true, role });
        }
    },
}));
