import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import { mockEvents, mockRegistrations, currentUser } from '@/data/mock';
import { formatDate } from '@/utils/format';

export default function MyRegistrationsPage() {
  const eventMap = new Map(mockEvents.map((e) => [e.id, e]));
  const userRegistrations = mockRegistrations
    .filter((r) => r.userId === currentUser.id)
    .map((r) => {
      const event = eventMap.get(r.eventId);
      return {
        ...r,
        eventTitle: event?.title ?? 'Unknown',
        eventDate: event?.date ?? '',
      };
    });

  type RowType = typeof userRegistrations[number];

  const columns = [
    { key: 'eventTitle', header: 'Event' },
    { key: 'eventDate', header: 'Date', render: (row: RowType) => formatDate(row.eventDate) },
    { key: 'status', header: 'Status', render: (row: RowType) => <Badge label={row.status} variant={row.status === 'confirmed' ? 'success' : row.status === 'waitlisted' ? 'warning' : 'error'} /> },
    { key: 'registeredAt', header: 'Registered On', render: (row: RowType) => formatDate(row.registeredAt) },
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
