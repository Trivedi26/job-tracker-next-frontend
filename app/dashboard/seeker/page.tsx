'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, List, Typography, Spin } from 'antd';
import SeekerDashboardLayout from '@/components/SeekerDashboardLayout';

const { Title } = Typography;

interface Job {
  _id: string;
  title: string;
  company: string;
  status: string;
  appliedDate?: string;
  notes?: string;
}

export default function SeekerDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log('🧪 Token being used in request:', token);

      try {
        const res = await axios.get('/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ Jobs fetched:', res.data);
        setJobs(res.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error('❌ Error fetching jobs:', err.message);
        } else {
          console.error('❌ Error fetching jobs:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchJobs();
    } else {
      console.warn('⚠️ No token found in Zustand store.');
      setLoading(false);
    }
  }, [token]);

  return (
    <SeekerDashboardLayout>
      <Title level={2}>Job Listings</Title>
      {loading ? (
        <Spin tip="Loading jobs..." />
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={jobs}
          renderItem={(job) => (
            <List.Item>
              <Card title={job.title}>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
                {job.appliedDate && (
                  <p>
                    <strong>Applied Date:</strong> {new Date(job.appliedDate).toLocaleDateString()}
                  </p>
                )}
                {job.notes && (
                  <p>
                    <strong>Notes:</strong> {job.notes}
                  </p>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
      ;
    </SeekerDashboardLayout>
  );
}
