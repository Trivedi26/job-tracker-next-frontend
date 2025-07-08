'use client';

import { Form, Input, Button, Select, message } from 'antd';
import { useState } from 'react';
import axios from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Option } = Select;

export default function JobForm() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await axios.post('/jobs', values);
            message.success('Job posted successfully!');
            router.push('/dashboard/employer/my-jobs'); // optional redirect
        } catch (error) {
            console.error('❌ Job post error:', error);
            message.error('Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Job Title"
                    rules={[{ required: true, message: 'Please enter the job title' }]}
                >
                    <Input placeholder="e.g. Frontend Developer" />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter the location' }]}
                >
                    <Input placeholder="e.g. Remote or Mumbai" />
                </Form.Item>

                <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[{ required: true, message: 'Please enter the salary' }]}
                >
                    <Input placeholder="e.g. ₹10,00,000 per annum" />
                </Form.Item>

                <Form.Item
                    name="jobType"
                    label="Job Type"
                    rules={[{ required: true, message: 'Please select a job type' }]}
                >
                    <Select placeholder="Select job type">
                        <Option value="full-time">Full-Time</Option>
                        <Option value="part-time">Part-Time</Option>
                        <Option value="internship">Internship</Option>
                        <Option value="freelance">Freelance</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Job Description"
                    rules={[{ required: true, message: 'Please enter the job description' }]}
                >
                    <TextArea rows={6} placeholder="Detailed job responsibilities and requirements..." />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Post Job
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
