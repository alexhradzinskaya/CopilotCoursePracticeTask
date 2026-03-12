import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Event Planner',
  description: 'Plan and manage events',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
