'use client';

import { Form, Input, Button, Typography, Layout, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from '@/utils/axiosInstance';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
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
      message.success('✅ Login successful!', 2);

      setTimeout(() => {
        router.push(`/dashboard/${user.role}`);
      }, 500);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      message.error(`❌ ${errorMessage}`, 2);
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
      }}
    >
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: 420,
            padding: 32,
            borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: 30 }}>
            👋 Welcome Back!
          </Title>

          <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email"
                size="large"
                style={{ borderRadius: 10 }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
                style={{ borderRadius: 10 }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  borderRadius: 10,
                  background: '#1890ff',
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 10 }}>
            Don’t have an account?{' '}
            <Link href="/register" style={{ color: '#1890ff' }}>
              Register here
            </Link>
          </Text>
        </motion.div>
      </Content>
    </Layout>
  );
}
