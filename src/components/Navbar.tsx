import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-600">EventPlanner</Link>
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <Link href="/events" className="hover:text-indigo-600 transition-colors">Events</Link>
        <Link href="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
      </div>
    </nav>
  );
}
