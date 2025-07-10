// app/employer/job-posts/page.tsx

'use client';

import JobForm from '../../../components/JobForm';

export default function EmployerJobPostsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <JobForm />
    </div>
  );
}
