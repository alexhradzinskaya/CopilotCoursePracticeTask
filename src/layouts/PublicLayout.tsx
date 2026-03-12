import Navbar from '@/components/Navbar';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-400">
        © 2025 EventPlanner
      </footer>
    </div>
  );
}
