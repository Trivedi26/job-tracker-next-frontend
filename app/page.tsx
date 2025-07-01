'use client';

import { Button, Typography, Layout } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            width: 480,
            padding: 32,
            background: 'white',
            borderRadius: 12,
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          <Title level={2}>Welcome to Job Tracker + AI Resume Builder</Title>
          <Paragraph style={{ marginBottom: 32 }}>
            Manage your job applications, track progress, and generate smart resumes.
          </Paragraph>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Link href="/login">
              <Button type="primary" size="large">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="large">Register</Button>
            </Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
