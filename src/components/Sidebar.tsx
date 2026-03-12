'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  links: SidebarLink[];
  title?: string;
}

export default function Sidebar({ links, title = 'Menu' }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <p className="text-xs uppercase font-semibold text-gray-400 mb-4">{title}</p>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              pathname === link.href ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
