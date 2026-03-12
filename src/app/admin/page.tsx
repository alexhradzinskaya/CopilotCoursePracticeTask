import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/PageHeader';
import StatsCard from '@/components/StatsCard';
import { mockEvents, mockUsers, mockRegistrations } from '@/data/mock';

export default function AdminDashboardPage() {
  const upcomingCount = mockEvents.filter((e) => e.status === 'upcoming').length;
  const completedCount = mockEvents.filter((e) => e.status === 'completed').length;

  return (
    <AdminLayout>
      <PageHeader title="Admin Dashboard" subtitle="Overview of the Event Planner platform." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Events" value={mockEvents.length} icon="📅" />
        <StatsCard title="Upcoming Events" value={upcomingCount} icon="🚀" />
        <StatsCard title="Completed Events" value={completedCount} icon="✅" />
        <StatsCard title="Total Users" value={mockUsers.length} icon="👥" />
        <StatsCard title="Total Registrations" value={mockRegistrations.length} icon="🎟️" description="All time" />
      </div>
    </AdminLayout>
  );
}
