'use client';

import { Form, Input, Button, Typography, Layout, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from '@/utils/axiosInstance'; // ✅ Import your Axios instance

const { Title } = Typography;
const { Content } = Layout;

export default function LoginPage() {
  const onFinish = async (values: any) => {
    try {
      const res = await axios.post('/auth/login', values); // 👈 Login API
      const { token } = res.data;

      // ✅ Store token in localStorage
      localStorage.setItem('token', token);

      message.success('Login successful!');
      window.location.href = '/dashboard'; // 👈 Redirect after login
    } catch (error: any) {
      console.error('Login failed:', error.response?.data);
      message.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 400, padding: 24, background: 'white', borderRadius: 8 }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Login
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
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
