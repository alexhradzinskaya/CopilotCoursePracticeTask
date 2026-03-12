'use client';

interface FilterPanelProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'social', label: 'Social' },
];

const statuses = [
  { value: '', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function FilterPanel({ selectedCategory, selectedStatus, onCategoryChange, onStatusChange }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <select value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
  );
}
