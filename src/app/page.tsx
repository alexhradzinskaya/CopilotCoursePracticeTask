import PublicLayout from '@/layouts/PublicLayout';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mock';
import Link from 'next/link';

export default function HomePage() {
  const featuredEvents = mockEvents.filter((e) => e.status === 'upcoming').slice(0, 3);
  return (
    <PublicLayout>
      <section className="text-center py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Discover &amp; Join Amazing Events</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">Browse conferences, workshops, meetups and more. Register in seconds.</p>
        <Link href="/events" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
          Browse All Events
        </Link>
      </section>
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
        <div className="mt-6 text-center">
          <Link href="/events" className="text-indigo-600 hover:underline text-sm font-medium">View all events →</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
