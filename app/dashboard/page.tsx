'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Typography, Layout, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const { Title } = Typography;
const { Content } = Layout;

export default function DashboardPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout); // ✅ Logout from store

    // 🔒 Redirect to login if not authenticated
    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const handleLogout = () => {
        logout(); // ✅ Clear token from Zustand + localStorage
        router.push('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ padding: 24, background: 'white', borderRadius: 8, textAlign: 'center' }}>
                    <Title level={2}>Welcome to Dashboard 🎯</Title>
                    <p>You are now logged in.</p>

                    <Button
                        type="primary"
                        danger
                        onClick={handleLogout}
                        style={{ marginTop: 20 }}
                    >
                        Logout
                    </Button>
                </div>
            </Content>
        </Layout>
    );
}
