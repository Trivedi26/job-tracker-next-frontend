'use client';

import { Typography, Layout, Button } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { Content } = Layout;

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        // TODO: Clear auth token or session here if needed
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
