'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import EventForm from '@/components/EventForm';
import { mockEvents } from '@/data/mock';
import { Event, EventFormData } from '@/types';
import { formatDate } from '@/utils/format';

type Feedback = { type: 'success' | 'error'; message: string };

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleAddEvent = (data: EventFormData) => {
    const newEvent: Event = { ...data, id: `e${Date.now()}`, organizerId: 'u1', registeredCount: 0 };
    setEvents((prev) => [newEvent, ...prev]);
    setShowForm(false);
    setFeedback({ type: 'success', message: 'Event created successfully.' });
  };

  const handleEditEvent = (data: EventFormData) => {
    if (!editingEvent) return;
    setEvents((prev) => prev.map((e) => e.id === editingEvent.id ? { ...editingEvent, ...data } : e));
    setEditingEvent(null);
    setFeedback({ type: 'success', message: 'Event updated successfully.' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setFeedback({ type: 'success', message: 'Event deleted successfully.' });
    }
  };

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category', render: (row: Event) => <Badge label={row.category} variant="info" /> },
    { key: 'status', header: 'Status', render: (row: Event) => <Badge label={row.status} variant={row.status === 'upcoming' ? 'success' : row.status === 'cancelled' ? 'error' : 'default'} /> },
    { key: 'date', header: 'Date', render: (row: Event) => formatDate(row.date) },
    { key: 'registeredCount', header: 'Registered', render: (row: Event) => `${row.registeredCount} / ${row.capacity}` },
    {
      key: 'actions', header: 'Actions', render: (row: Event) => (
        <div className="flex gap-2">
          <button
            onClick={() => { setEditingEvent(row); setShowForm(false); }}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const isAddMode = showForm && !editingEvent;

  return (
    <AdminLayout>
      <PageHeader
        title="Manage Events"
        subtitle={`${events.length} total events`}
        action={
          <button
            onClick={() => { setShowForm(!isAddMode); setEditingEvent(null); }}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            {isAddMode ? 'Cancel' : '+ Add Event'}
          </button>
        }
      />
      {feedback && (
        <div
          role="alert"
          className={`flex items-center justify-between rounded-lg px-4 py-3 mb-4 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
          {feedback.message}
          <button onClick={() => setFeedback(null)} className="ml-4 opacity-60 hover:opacity-100" aria-label="Dismiss">✕</button>
        </div>
      )}
      {isAddMode && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">New Event</h2>
          <EventForm onSubmit={handleAddEvent} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {editingEvent && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Event</h2>
          <EventForm initial={editingEvent} onSubmit={handleEditEvent} onCancel={() => setEditingEvent(null)} />
        </div>
      )}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-700 font-medium">No events yet</p>
          <p className="text-gray-400 text-sm mt-1">Click <strong>+ Add Event</strong> to create your first event.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={events} keyField="id" />
      )}
    </AdminLayout>
  );
}
