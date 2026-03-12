import { Event } from '@/types';

export function filterEvents(events: Event[], search: string, category: string, status: string): Event[] {
  const searchLower = search.toLowerCase();
  return events.filter((e) => {
    const matchSearch =
      !searchLower ||
      e.title.toLowerCase().includes(searchLower) ||
      e.description.toLowerCase().includes(searchLower);
    const matchCategory = !category || e.category === category;
    const matchStatus = !status || e.status === status;
    return matchSearch && matchCategory && matchStatus;
  });
}
