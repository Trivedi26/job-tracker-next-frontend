'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axios from '@/utils/axiosInstance';
import SeekerDashboardLayout from '@/components/SeekerDashboardLayout';
import { useAuthStore } from '@/store/useAuthStore';

const { Title } = Typography;

interface ProfileFormValues {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [form] = Form.useForm<ProfileFormValues>();
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const role = useAuthStore((state) => state.role);
  // const user = useAuthStore((state) => state.user); // 🔥 removed unused variable

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/user/me');
        form.setFieldsValue(res.data);
      } catch (err) {
        console.error('❌ Failed to load profile:', err);
        message.error('Failed to load profile');
      }
    };

    if (token) fetchProfile();
  }, [form, token]);

  const onFinish = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const res = await axios.put('/user/update-profile', values);
      message.success('Profile updated successfully!');
      login(token!, role!, res.data.user); // update Zustand store
    } catch (err) {
      console.error('❌ Update error:', err);
      message.error('Update failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeekerDashboardLayout>
      <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
        <Title level={3}>Your Profile</Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </SeekerDashboardLayout>
  );
}
