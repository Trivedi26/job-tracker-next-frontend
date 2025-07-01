'use client';

import { useState } from 'react';
import { Form, Input, Button, Typography, Layout, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { Content } = Layout;

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true); // 🌀 Start spinner
        try {
            const res = await axios.post('/api/job-tracker/auth/register', values);
            console.log('✅ Registered:', res.data);
            message.success('Registration successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || err.message || 'Unknown error';
            message.error(errorMsg);
            console.error('❌ Registration error:', errorMsg);
        } finally {
            setLoading(false); // ❌ Stop spinner
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 400, padding: 24, background: 'white', borderRadius: 8 }}>
                    <Title level={3} style={{ textAlign: 'center' }}>Register</Title>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Your name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Enter a valid email!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>

                    <p style={{ textAlign: 'center' }}>
                        Already have an account? <Link href="/login">Login</Link>
                    </p>
                </div>
            </Content>
        </Layout>
    );
}
