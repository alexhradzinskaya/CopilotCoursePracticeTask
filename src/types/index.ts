export type EventCategory = 'conference' | 'workshop' | 'meetup' | 'webinar' | 'social';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type UserRole = 'admin' | 'user';
export type RegistrationStatus = 'confirmed' | 'waitlisted' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  date: string;
  endDate: string;
  location: string;
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  organizerId: string;
  tags: string[];
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  joinedAt: string;
  bio?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  registeredAt: string;
}

export type EventFormData = Omit<Event, 'id' | 'organizerId' | 'registeredCount'>;
