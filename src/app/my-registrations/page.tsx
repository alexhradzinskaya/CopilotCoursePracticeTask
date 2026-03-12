import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import { mockEvents, mockRegistrations, currentUser } from '@/data/mock';

export default function MyRegistrationsPage() {
  const userRegistrations = mockRegistrations
    .filter((r) => r.userId === currentUser.id)
    .map((r) => ({
      ...r,
      eventTitle: mockEvents.find((e) => e.id === r.eventId)?.title ?? 'Unknown',
      eventDate: mockEvents.find((e) => e.id === r.eventId)?.date ?? '',
    }));

  type RowType = typeof userRegistrations[number];

  const columns = [
    { key: 'eventTitle', header: 'Event' },
    { key: 'eventDate', header: 'Date', render: (row: RowType) => new Date(row.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    { key: 'status', header: 'Status', render: (row: RowType) => <Badge label={row.status} variant={row.status === 'confirmed' ? 'success' : row.status === 'waitlisted' ? 'warning' : 'error'} /> },
    { key: 'registeredAt', header: 'Registered On', render: (row: RowType) => new Date(row.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  ];

  return (
    <AppLayout>
      <PageHeader title="My Registrations" subtitle={`${userRegistrations.length} registration${userRegistrations.length !== 1 ? 's' : ''}`} />
      {userRegistrations.length === 0 ? (
        <p className="text-gray-400">You have not registered for any events yet.</p>
      ) : (
        <DataTable columns={columns} data={userRegistrations} keyField="id" />
      )}
    </AppLayout>
  );
}
