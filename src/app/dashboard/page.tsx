import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader';
import StatsCard from '@/components/StatsCard';
import EventCard from '@/components/EventCard';
import { mockEvents, mockRegistrations, currentUser } from '@/data/mock';

export default function DashboardPage() {
  const userRegistrations = mockRegistrations.filter((r) => r.userId === currentUser.id);
  const upcomingEvents = userRegistrations
    .map((r) => mockEvents.find((e) => e.id === r.eventId))
    .filter((e): e is NonNullable<typeof e> => e !== undefined)
    .filter((e) => e.status === 'upcoming')
    .slice(0, 3);

  return (
    <AppLayout>
      <PageHeader title={`Welcome back, ${currentUser.name}!`} subtitle="Here's what's happening with your events." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Registered Events" value={userRegistrations.length} icon="🎟️" />
        <StatsCard title="Upcoming" value={upcomingEvents.length} icon="📅" />
        <StatsCard title="Total Events" value={mockEvents.length} icon="🌐" />
        <StatsCard title="Free Events" value={mockEvents.filter((e) => e.price === 0).length} icon="🆓" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p className="text-gray-400">No upcoming events. <a href="/events" className="text-indigo-600 hover:underline">Browse events</a></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </AppLayout>
  );
}
