import { notFound } from 'next/navigation';
import PublicLayout from '@/layouts/PublicLayout';
import Badge from '@/components/Badge';
import { mockEvents } from '@/data/mock';
import Link from 'next/link';
import { formatDateLong, formatTime } from '@/utils/format';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);
  if (!event) notFound();

  const dateStr = formatDateLong(event.date);
  const timeStr = formatTime(event.date);
  const spotsLeft = event.capacity - event.registeredCount;

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto">
        <Link href="/events" className="text-indigo-600 text-sm hover:underline mb-4 inline-block">← Back to Events</Link>
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <Badge label={event.status} variant={event.status === 'upcoming' ? 'success' : 'default'} />
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div><p className="font-medium text-gray-700">Date</p><p>{dateStr}</p></div>
            <div><p className="font-medium text-gray-700">Time</p><p>{timeStr}</p></div>
            <div><p className="font-medium text-gray-700">Location</p><p>{event.location}</p></div>
            <div><p className="font-medium text-gray-700">Category</p><Badge label={event.category} variant="info" /></div>
            <div><p className="font-medium text-gray-700">Price</p><p>{event.price === 0 ? 'Free' : `$${event.price}`}</p></div>
            <div><p className="font-medium text-gray-700">Spots Left</p><p>{spotsLeft > 0 ? `${spotsLeft} spots` : 'Sold out'}</p></div>
          </div>
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">#{tag}</span>)}
            </div>
          )}
          {event.status === 'upcoming' && spotsLeft > 0 && (
            <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Register Now</button>
          )}
          {event.status === 'upcoming' && spotsLeft === 0 && (
            <button className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed">Sold Out</button>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
