'use client';
import { useState } from 'react';
import { Event, EventCategory, EventStatus } from '@/types';

type EventFormData = Omit<Event, 'id' | 'organizerId' | 'registeredCount'>;

interface EventFormProps {
  initial?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
}

type FormErrors = Partial<Record<keyof EventFormData, string>>;

function validate(form: EventFormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = 'Title is required.';
  else if (form.title.trim().length < 3) errors.title = 'Title must be at least 3 characters.';
  if (!form.description.trim()) errors.description = 'Description is required.';
  if (!form.date) errors.date = 'Start date is required.';
  if (!form.endDate) errors.endDate = 'End date is required.';
  else if (form.date && form.endDate <= form.date) errors.endDate = 'End date must be after start date.';
  if (!form.location.trim()) errors.location = 'Location is required.';
  if (form.capacity < 1) errors.capacity = 'Capacity must be at least 1.';
  if (form.price < 0) errors.price = 'Price cannot be negative.';
  return errors;
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof EventFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof EventFormData) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input value={form.title} onChange={(e) => set('title', e.target.value)}
          className={inputClass('title')} />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
          className={inputClass('description')} />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
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
          <input type="datetime-local" value={form.date} onChange={(e) => set('date', e.target.value)}
            className={inputClass('date')} />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="datetime-local" value={form.endDate} onChange={(e) => set('endDate', e.target.value)}
            className={inputClass('endDate')} />
          {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input value={form.location} onChange={(e) => set('location', e.target.value)}
          className={inputClass('location')} />
        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input type="number" min={1} value={form.capacity} onChange={(e) => set('capacity', Number(e.target.value))}
            className={inputClass('capacity')} />
          {errors.capacity && <p className="mt-1 text-xs text-red-500">{errors.capacity}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input type="number" min={0} value={form.price} onChange={(e) => set('price', Number(e.target.value))}
            className={inputClass('price')} />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting}
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? 'Saving…' : 'Save Event'}
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
