'use client';
import { useState } from 'react';
import { Event, EventCategory, EventStatus } from '@/types';

type EventFormData = Omit<Event, 'id' | 'organizerId' | 'registeredCount'>;

interface EventFormProps {
  initial?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
}

export default function EventForm({ initial, onSubmit, onCancel }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    category: initial?.category ?? 'meetup',
    status: initial?.status ?? 'upcoming',
    date: initial?.date ?? '',
    endDate: initial?.endDate ?? '',
    location: initial?.location ?? '',
    capacity: initial?.capacity ?? 50,
    tags: initial?.tags ?? [],
    price: initial?.price ?? 0,
  });

  const set = (field: keyof EventFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input required value={form.title} onChange={(e) => set('title', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value as EventCategory)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {(['conference','workshop','meetup','webinar','social'] as EventCategory[]).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value as EventStatus)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {(['upcoming','ongoing','completed','cancelled'] as EventStatus[]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="datetime-local" required value={form.date} onChange={(e) => set('date', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="datetime-local" required value={form.endDate} onChange={(e) => set('endDate', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input required value={form.location} onChange={(e) => set('location', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input type="number" min={1} value={form.capacity} onChange={(e) => set('capacity', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input type="number" min={0} value={form.price} onChange={(e) => set('price', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Save Event
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
