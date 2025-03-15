import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CLogin from './cLogin';
import '@testing-library/jest-dom'; // For better assertion methods
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mocking useNavigate, Swal, and axios
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('sweetalert2');
jest.mock('axios');

const mockNavigate = useNavigate();

describe('CLogin Component', () => {
  // Test case 1: Rendering the component
  test('renders the CLogin component', () => {
    render(
      <Router>
        <CLogin />
      </Router>
    );

    // Check if the "Log In" button is rendered
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    // Check if the Username and Password input fields are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  // Test case 2: Simulating user input and form submission
  test('allows user to input login details and submit the form', async () => {
    axios.post.mockResolvedValueOnce({ data: { firstName: 'Kasuni' } });

    render(
      <Router>
        <CLogin />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    // Simulate entering input
    fireEvent.change(usernameInput, { target: { value: 'customer' } });
    fireEvent.change(passwordInput, { target: { value: 'customer123' } });

    // Ensure input values are updated
    expect(usernameInput.value).toBe('customer');
    expect(passwordInput.value).toBe('customer123');

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check if Swal and navigate are called correctly
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
        icon: 'success',
        title: 'Welcome back! Kasuni'
      }));

      expect(mockNavigate).toHaveBeenCalledWith('/customer/customerDashboard');
    });
  });

  // Test case 3: Invalid credentials scenario
  test('shows error alert when login fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <Router>
        <CLogin />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    // Simulate entering input
    fireEvent.change(usernameInput, { target: { value: 'wrongUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check if Swal displays an error message
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
        icon: 'error',
        title: 'Login failed',
        text: 'Invalid credentials',
      }));
    });
  });

  // Test case 4: Customer-specific login scenario
  test('navigates to customer dashboard when customer logs in', async () => {
    axios.post.mockResolvedValueOnce({ data: { firstName: 'Kasuni' } });

    render(
      <Router>
        <CLogin />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    // Simulate entering customer credentials
    fireEvent.change(usernameInput, { target: { value: 'customer' } });
    fireEvent.change(passwordInput, { target: { value: 'customer123' } });
    fireEvent.click(loginButton);

    // Check if Swal and navigate are called correctly for customer
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
        icon: 'success',
        title: 'Welcome back! Kasuni'
      }));

      expect(mockNavigate).toHaveBeenCalledWith('/customer/customerDashboard');
    });
  });
});
