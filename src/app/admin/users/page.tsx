import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import { mockUsers } from '@/data/mock';
import { User } from '@/types';

export default function AdminUsersPage() {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (row: User) => <Badge label={row.role} variant={row.role === 'admin' ? 'error' : 'default'} /> },
    { key: 'joinedAt', header: 'Joined', render: (row: User) => new Date(row.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Manage Users" subtitle={`${mockUsers.length} registered users`} />
      <DataTable columns={columns} data={mockUsers} keyField="id" />
    </AdminLayout>
  );
}
