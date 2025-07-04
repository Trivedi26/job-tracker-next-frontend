'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Spin } from 'antd';

export default function DashboardPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Wait until hydration completes
        if (typeof window !== 'undefined') {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (role === 'seeker') {
                router.push('/dashboard/seeker');
            } else if (role === 'employer') {
                router.push('/dashboard/employer');
            }
            setIsChecking(false);
        }
    }, [isAuthenticated, role, router]);

    if (isChecking) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spin tip="Redirecting..." size="large" />
            </div>
        );
    }

    return null;
}
