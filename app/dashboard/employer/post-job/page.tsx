'use client';

import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useAuthStore } from '@/store/useAuthStore';
import EmployerDashboardLayout from '../../../../components/EmployerDashboardLayout';

const { Title } = Typography;

interface JobFormValues {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

export default function PostJobPage() {
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  const onFinish = async (values: JobFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to post job');
      }

      message.success('✅ Job posted successfully!');
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('❌ Unknown error occurred while posting job.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployerDashboardLayout>
      <Title level={3}>📝 Post a New Job</Title>
      <Form<JobFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Job Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a job title' }]}
        >
          <Input placeholder="e.g., Frontend Developer" />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="company"
          rules={[{ required: true, message: 'Please enter company name' }]}
        >
          <Input placeholder="e.g., Google" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please enter location' }]}
        >
          <Input placeholder="e.g., Remote / Bangalore" />
        </Form.Item>

        <Form.Item
          label="Job Type"
          name="type"
          rules={[{ required: true, message: 'Please enter job type' }]}
        >
          <Input placeholder="e.g., Full-time / Contract" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter job description' }]}
        >
          <Input.TextArea rows={6} placeholder="Job responsibilities, skills, etc." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Post Job
          </Button>
        </Form.Item>
      </Form>
    </EmployerDashboardLayout>
  );
}
