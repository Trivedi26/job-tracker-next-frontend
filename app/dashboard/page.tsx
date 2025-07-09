'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import SeekerDashboardLayout from '@/components/SeekerDashboardLayout';

export default function SeekerDashboard() {
    const { role, isAuthenticated } = useAuthStore((state) => ({
        role: state.role,
        isAuthenticated: state.isAuthenticated,
    }));
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (role !== 'seeker') {
            router.push('/dashboard/employer'); // or show 403 page
        }
    }, [isAuthenticated, role, router]);

    return (
        <SeekerDashboardLayout>
            <h1>🎯 Seeker Dashboard</h1>
            <p>Welcome, find jobs and apply easily!</p>
        </SeekerDashboardLayout>
    );
}
