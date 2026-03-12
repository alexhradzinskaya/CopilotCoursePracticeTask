import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });

  it('renders the Browse All Events link', () => {
    render(<HomePage />);
    expect(screen.getByText(/Browse All Events/i)).toBeInTheDocument();
  });

  it('renders featured events section', () => {
    render(<HomePage />);
    expect(screen.getByText(/Featured Upcoming Events/i)).toBeInTheDocument();
  });
});
