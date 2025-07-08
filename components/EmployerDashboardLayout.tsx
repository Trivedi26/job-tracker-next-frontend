'use client';

import { Layout, Menu } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
    DashboardOutlined,
    FileAddOutlined,
    ProfileOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;

const navItems = [
    {
        key: '/employer/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/employer/job-posts',
        icon: <UnorderedListOutlined />,
        label: 'My Job Posts',
    },
    {
        key: '/employer/post-job',
        icon: <FileAddOutlined />,
        label: 'Post New Job',
    },
    {
        key: '/employer/applicants',
        icon: <UsergroupAddOutlined />,
        label: 'Applicants',
    },
    {
        key: '/employer/profile',
        icon: <ProfileOutlined />,
        label: 'Profile',
    },
];

export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, role, logout } = useAuthStore();
    const [allowed, setAllowed] = useState<boolean | null>(null);
    const checkedRef = useRef(false); // ensure useEffect only runs once

    // Get the matching nav key for highlighting menu item
    const getMatchedKey = (path: string) => {
        const match = navItems.find(item => path.startsWith(item.key));
        return match ? match.key : '';
    };

    useEffect(() => {
        if (checkedRef.current) return;
        checkedRef.current = true;

        if (!isAuthenticated) {
            router.replace('/login');
            return;
        }

        if (role !== 'employer') {
            setAllowed(false);
            setTimeout(() => {
                router.replace('/dashboard/seeker');
            }, 1500);
            return;
        }

        setAllowed(true);
    }, []);

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            logout();
            router.replace('/login');
        } else {
            router.push(key);
        }
    };

    if (allowed === null) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>🔍 Checking access...</p>;
    }

    if (!allowed) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                ❌ You are not allowed to access the Employer Dashboard.
                <br />
                Redirecting to your dashboard...
            </div>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" width={220}>
                <div className="text-xl font-bold text-center py-6 border-b">🏢 Employer</div>
                <Menu
                    mode="inline"
                    selectedKeys={[getMatchedKey(pathname)]}
                    onClick={handleMenuClick}
                    items={[
                        ...navItems,
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout style={{ padding: '24px' }}>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
}
