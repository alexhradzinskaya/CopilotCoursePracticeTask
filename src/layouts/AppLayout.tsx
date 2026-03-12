import Sidebar from '@/components/Sidebar';
import { currentUser } from '@/data/mock';

const userLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/my-registrations', label: 'My Registrations', icon: '🎟️' },
  { href: '/events', label: 'Browse Events', icon: '📅' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar links={userLinks} title="User Menu" />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">Welcome, <strong>{currentUser.name}</strong></span>
          <a href="/login" className="text-sm text-indigo-600 hover:underline">Sign out</a>
        </header>
        <main className="flex-1 p-6 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
