import { render, screen } from '@testing-library/react';
import App from './App';

test('renders it works text', () => {
  render(<App />);
  const linkElement = screen.getByText(/It Works!/i);
  expect(linkElement).toBeInTheDocument();
});
