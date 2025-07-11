import 'antd/dist/reset.css'; // ✅ REQUIRED for message/notification styling
import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import AuthInitializer from '@/components/AuthInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Job Tracker',
  description: 'Powered by Shubham Trivedi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthInitializer /> {/* 👈 Init Zustand Auth on load */}
        {children}
      </body>
    </html>
  );
}
