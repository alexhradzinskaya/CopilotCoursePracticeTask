import Sidebar from '@/components/Sidebar';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/events', label: 'Manage Events', icon: '📅' },
  { href: '/admin/users', label: 'Manage Users', icon: '👥' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar links={adminLinks} title="Admin Panel" />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-red-600">⚠️ Admin Mode</span>
          <a href="/login" className="text-sm text-indigo-600 hover:underline">Sign out</a>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
