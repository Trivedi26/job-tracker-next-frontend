'use client';

import { Layout, Menu, Avatar, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import {
    UserOutlined,
    FileTextOutlined,
    BookOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/useAuthStore';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SeekerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

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
                    <Title level={5} style={{ marginTop: 12, marginBottom: 0 }}>
                        {user?.name || 'Seeker Name'}
                    </Title>
                    <Text type="secondary">{user?.email || 'seeker@example.com'}</Text>
                </div>

                <Menu
                    onClick={handleMenuClick}
                    items={[
                        { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
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

export default SeekerDashboardLayout;
