import Link from 'next/link';
import { Event, EventCategory } from '@/types';
import Badge, { BadgeVariant } from './Badge';
import { formatDate } from '@/utils/format';

interface EventCardProps {
  event: Event;
}

const categoryVariant: Record<EventCategory, BadgeVariant> = {
  conference: 'info', workshop: 'warning', meetup: 'success', webinar: 'default', social: 'success',
};

export default function EventCard({ event }: EventCardProps) {
  const dateStr = formatDate(event.date);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">{event.title}</h3>
        <Badge label={event.category} variant={categoryVariant[event.category]} />
      </div>
      <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p>📅 {dateStr}</p>
        <p>📍 {event.location}</p>
        <p>👥 {event.registeredCount} / {event.capacity} registered</p>
        <p>💰 {event.price === 0 ? 'Free' : `$${event.price}`}</p>
      </div>
      <Link href={`/events/${event.id}`}
        className="mt-auto inline-block text-center bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
        View Details
      </Link>
    </div>
  );
}
