'use client';

import { Layout, Menu, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import {
    UserOutlined,
    FileTextOutlined,
    BookOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/useAuthStore';

const { Sider, Content } = Layout;

const SeekerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            logout();
            router.push('/login');
        } else {
            router.push(`/dashboard/seeker/${key}`);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} style={{ background: '#fff', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Avatar size={80} icon={<UserOutlined />} />
                    <h3>Seeker Name</h3>
                    <p>seeker@example.com</p>
                </div>
                <Menu
                    onClick={handleMenuClick}
                    items={[
                        { key: 'resume', icon: <FileTextOutlined />, label: 'Resume Builder' },
                        { key: 'courses', icon: <BookOutlined />, label: 'Courses' },
                        { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
                    ]}
                />
            </Sider>
            <Layout>
                <Content style={{ padding: '24px' }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default SeekerDashboardLayout; // ✅ Must be present
