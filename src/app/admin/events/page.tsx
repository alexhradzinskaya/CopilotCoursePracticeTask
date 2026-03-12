'use client';
import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import EventForm from '@/components/EventForm';
import { mockEvents } from '@/data/mock';
import { Event } from '@/types';

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (data: Omit<Event, 'id' | 'organizerId' | 'registeredCount'>) => {
    const newEvent: Event = { ...data, id: `e${Date.now()}`, organizerId: 'u1', registeredCount: 0 };
    setEvents((prev) => [newEvent, ...prev]);
    setShowForm(false);
  };

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category', render: (row: Event) => <Badge label={row.category} variant="info" /> },
    { key: 'status', header: 'Status', render: (row: Event) => <Badge label={row.status} variant={row.status === 'upcoming' ? 'success' : row.status === 'cancelled' ? 'error' : 'default'} /> },
    { key: 'date', header: 'Date', render: (row: Event) => new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    { key: 'registeredCount', header: 'Registered', render: (row: Event) => `${row.registeredCount} / ${row.capacity}` },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Manage Events"
        subtitle={`${events.length} total events`}
        action={
          <button onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            {showForm ? 'Cancel' : '+ Add Event'}
          </button>
        }
      />
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">New Event</h2>
          <EventForm onSubmit={handleAddEvent} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <DataTable columns={columns} data={events} keyField="id" />
    </AdminLayout>
  );
}
