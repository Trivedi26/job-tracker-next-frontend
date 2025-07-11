'use client';

import { Form, Input, Button, Typography, Layout, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from '@/utils/axiosInstance';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { AxiosError } from 'axios'; // ✅ Proper error type

const { Title } = Typography;
const { Content } = Layout;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    console.log('📦 Zustand - Token:', token);
    console.log('✅ Zustand - isAuthenticated:', isAuthenticated);
  }, [token, isAuthenticated]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await axios.post('/auth/login', values);
      const { token, user } = res.data;

      login(token, user.role, user);
      message.success('✅ Login successful!', 2); // ✅ Success toast

      setTimeout(() => {
        router.push(`/dashboard/${user.role}`);
      }, 500);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>; // ✅ Typed error
      console.error('❌ Login failed:', err);

      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      message.error(`❌ ${errorMessage}`, 2); // ✅ Error toast
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 400, padding: 24, background: 'white', borderRadius: 8 }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Login
          </Title>

          <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <p style={{ textAlign: 'center' }}>
            Don’t have an account? <Link href="/register">Register</Link>
          </p>
        </div>
      </Content>
    </Layout>
  );
}
