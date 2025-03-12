import AboutUs from '../Components/AboutUs';
import { render, screen, fireEvent } from '@testing-library/react';

it('renders the about us page', () => {
  render(<AboutUs />);
  const text = screen.getByText('AboutUs');
  expect(text).toBeInTheDocument();
});
