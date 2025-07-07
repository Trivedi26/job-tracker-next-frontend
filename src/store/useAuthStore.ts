import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    role: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, role: string, user: User) => void;
    logout: () => void;
    initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    role: null,
    user: null,
    isAuthenticated: false,

    login: (token, role, user) => {
        if (!token || !role || !user) {
            console.error('❌ login() called with missing data');
            return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(user));

        set({
            token,
            role,
            user,
            isAuthenticated: true,
        });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        set({
            token: null,
            role: null,
            user: null,
            isAuthenticated: false,
        });
    },

    initAuth: () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userStr = localStorage.getItem('user');

        if (token && role && userStr) {
            try {
                const user: User = JSON.parse(userStr);
                set({
                    token,
                    role,
                    user,
                    isAuthenticated: true,
                });
            } catch (error) {
                console.error('❌ Failed to parse user JSON:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('user');

                set({
                    token: null,
                    role: null,
                    user: null,
                    isAuthenticated: false,
                });
            }
        } else {
            set({
                token: null,
                role: null,
                user: null,
                isAuthenticated: false,
            });
        }
    },
}));
