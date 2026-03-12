import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventForm from '@/components/EventForm';

describe('EventForm', () => {
  it('renders all key form fields', () => {
    render(<EventForm onSubmit={jest.fn()} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('Price ($)')).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    render(<EventForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /save event/i }));
    await waitFor(() => {
      expect(screen.getByText('Title is required.')).toBeInTheDocument();
      expect(screen.getByText('Description is required.')).toBeInTheDocument();
      expect(screen.getByText('Start date is required.')).toBeInTheDocument();
      expect(screen.getByText('End date is required.')).toBeInTheDocument();
      expect(screen.getByText('Location is required.')).toBeInTheDocument();
    });
  });

  it('shows an error when title is too short', async () => {
    render(<EventForm onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText ? document.querySelector('input[type="text"]') ?? document.querySelectorAll('input')[0] : document.querySelectorAll('input')[0], { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button', { name: /save event/i }));
    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters.')).toBeInTheDocument();
    });
  });

  it('shows an error when end date is before start date', async () => {
    render(<EventForm onSubmit={jest.fn()} />);
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]');
    fireEvent.change(inputs[0], { target: { value: '2025-06-15T10:00' } });
    fireEvent.change(inputs[1], { target: { value: '2025-06-14T10:00' } });
    fireEvent.click(screen.getByRole('button', { name: /save event/i }));
    await waitFor(() => {
      expect(screen.getByText('End date must be after start date.')).toBeInTheDocument();
    });
  });

  it('does not call onSubmit when there are validation errors', async () => {
    const onSubmit = jest.fn();
    render(<EventForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /save event/i }));
    await waitFor(() => {
      expect(screen.getByText('Title is required.')).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with form data when the form is valid', async () => {
    const onSubmit = jest.fn();
    render(<EventForm onSubmit={onSubmit} />);

    const allInputs = document.querySelectorAll<HTMLInputElement>('input');
    const textInputs = Array.from(allInputs).filter((i) => i.type === 'text' || i.type === '');
    const dateInputs = Array.from(allInputs).filter((i) => i.type === 'datetime-local');
    const numberInputs = Array.from(allInputs).filter((i) => i.type === 'number');
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;

    fireEvent.change(textInputs[0], { target: { value: 'My Test Event' } });
    fireEvent.change(textarea, { target: { value: 'A detailed description.' } });
    fireEvent.change(textInputs[1] ?? allInputs[2], { target: { value: 'Conference Hall' } });
    fireEvent.change(dateInputs[0], { target: { value: '2025-08-01T09:00' } });
    fireEvent.change(dateInputs[1], { target: { value: '2025-08-01T17:00' } });
    fireEvent.change(numberInputs[0], { target: { value: '100' } });

    fireEvent.click(screen.getByRole('button', { name: /save event/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'My Test Event', description: 'A detailed description.' })
    );
  });

  it('renders the Cancel button and calls onCancel when clicked', () => {
    const onCancel = jest.fn();
    render(<EventForm onSubmit={jest.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('pre-populates fields when initial data is provided', () => {
    const initial = {
      title: 'Existing Event',
      description: 'Existing description',
      location: 'Room 101',
      date: '2025-09-01T08:00',
      endDate: '2025-09-01T16:00',
      category: 'conference' as const,
      status: 'upcoming' as const,
      capacity: 200,
      price: 50,
      tags: [],
    };
    render(<EventForm initial={initial} onSubmit={jest.fn()} />);
    expect((document.querySelector('input[type="text"]') as HTMLInputElement)?.value ?? (document.querySelectorAll('input')[0] as HTMLInputElement).value).toBe('Existing Event');
  });
});
