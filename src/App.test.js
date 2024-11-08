// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Sidebar and MainPanel components', () => {
    render(<App />);

    // Check if the Sidebar and MainPanel are rendered
    const sidebar = screen.getByText(/CHP#1/i);
    expect(sidebar).toBeInTheDocument();

    const mainPanel = screen.getByText(/Please select a chapter./i);
    expect(mainPanel).toBeInTheDocument();
  });
});
