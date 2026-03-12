'use client';
import { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import EventCard from '@/components/EventCard';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import { mockEvents } from '@/data/mock';
import { filterEvents } from '@/utils/filterEvents';

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const filtered = filterEvents(mockEvents, search, category, status);

  return (
    <PublicLayout>
      <PageHeader title="All Events" subtitle={`${filtered.length} event${filtered.length !== 1 ? 's' : ''} found`} />
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
        </div>
        <FilterPanel selectedCategory={category} selectedStatus={status} onCategoryChange={setCategory} onStatusChange={setStatus} />
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No events match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </PublicLayout>
  );
}
