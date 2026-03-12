import { render, screen } from '@testing-library/react';
import Badge from '@/components/Badge';

describe('Badge component', () => {
  it('renders the label text', () => {
    render(<Badge label="upcoming" />);
    expect(screen.getByText('upcoming')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { container } = render(<Badge label="test" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-gray-100');
  });

  it('applies success variant classes', () => {
    const { container } = render(<Badge label="success" variant="success" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-green-100');
  });

  it('applies error variant classes', () => {
    const { container } = render(<Badge label="error" variant="error" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-red-100');
  });
});
