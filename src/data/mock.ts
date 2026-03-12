import { Event, User, Registration } from '@/types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', joinedAt: '2023-01-15', bio: 'Event coordinator.' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', joinedAt: '2023-03-20', bio: 'Developer.' },
  { id: 'u3', name: 'Carol Williams', email: 'carol@example.com', role: 'user', joinedAt: '2023-05-10', bio: 'Designer.' },
  { id: 'u4', name: 'David Lee', email: 'david@example.com', role: 'user', joinedAt: '2023-07-01', bio: 'Product manager.' },
];

export const mockEvents: Event[] = [
  {
    id: 'e1', title: 'Next.js Conference 2025', description: 'A full-day conference on Next.js, React Server Components, and App Router.', category: 'conference', status: 'upcoming',
    date: '2025-06-15T09:00:00', endDate: '2025-06-15T18:00:00', location: 'New York, NY', capacity: 500, registeredCount: 342, organizerId: 'u1', tags: ['nextjs', 'react'], price: 99,
  },
  {
    id: 'e2', title: 'Tailwind CSS Workshop', description: 'Hands-on workshop on building UIs with Tailwind CSS.', category: 'workshop', status: 'upcoming',
    date: '2025-05-20T10:00:00', endDate: '2025-05-20T16:00:00', location: 'San Francisco, CA', capacity: 30, registeredCount: 28, organizerId: 'u1', tags: ['css', 'tailwind'], price: 49,
  },
  {
    id: 'e3', title: 'Monthly JS Meetup', description: 'Monthly gathering of JavaScript enthusiasts.', category: 'meetup', status: 'upcoming',
    date: '2025-04-25T18:30:00', endDate: '2025-04-25T21:00:00', location: 'Austin, TX', capacity: 80, registeredCount: 54, organizerId: 'u1', tags: ['javascript'], price: 0,
  },
  {
    id: 'e4', title: 'TypeScript Deep Dive Webinar', description: 'Advanced TypeScript patterns: generics, conditional types.', category: 'webinar', status: 'upcoming',
    date: '2025-05-05T14:00:00', endDate: '2025-05-05T16:00:00', location: 'Online (Zoom)', capacity: 200, registeredCount: 175, organizerId: 'u1', tags: ['typescript'], price: 0,
  },
  {
    id: 'e5', title: 'Design Systems Summit', description: 'Two-day summit on building design systems.', category: 'conference', status: 'completed',
    date: '2025-03-01T09:00:00', endDate: '2025-03-02T17:00:00', location: 'Chicago, IL', capacity: 300, registeredCount: 300, organizerId: 'u1', tags: ['design', 'ux'], price: 149,
  },
  {
    id: 'e6', title: 'React State Management Workshop', description: 'Compare Redux, Zustand, Jotai, and React Query.', category: 'workshop', status: 'completed',
    date: '2025-02-10T10:00:00', endDate: '2025-02-10T15:00:00', location: 'Seattle, WA', capacity: 25, registeredCount: 25, organizerId: 'u1', tags: ['react', 'state-management'], price: 39,
  },
];

export const mockRegistrations: Registration[] = [
  { id: 'r1', eventId: 'e1', userId: 'u2', status: 'confirmed', registeredAt: '2025-03-10T08:00:00' },
  { id: 'r2', eventId: 'e2', userId: 'u2', status: 'confirmed', registeredAt: '2025-03-12T10:00:00' },
  { id: 'r3', eventId: 'e3', userId: 'u2', status: 'confirmed', registeredAt: '2025-03-15T09:00:00' },
  { id: 'r4', eventId: 'e4', userId: 'u3', status: 'confirmed', registeredAt: '2025-03-18T11:00:00' },
  { id: 'r5', eventId: 'e5', userId: 'u3', status: 'confirmed', registeredAt: '2025-02-01T08:00:00' },
  { id: 'r6', eventId: 'e6', userId: 'u4', status: 'confirmed', registeredAt: '2025-01-20T09:00:00' },
];

export const currentUser = mockUsers[1];
