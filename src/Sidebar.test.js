// Sidebar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './AppContext';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  test('renders chapters and allows selection of a chapter', () => {
    render(
      <AppProvider>
        <Sidebar />
      </AppProvider>
    );

    const chapter1 = screen.getByText(/CHP#1/i);
    fireEvent.click(chapter1);

    expect(chapter1).toHaveStyle('font-weight: bold');
  });

  test('displays categories when a chapter is selected', () => {
    render(
      <AppProvider>
        <Sidebar />
      </AppProvider>
    );

    const chapter1 = screen.getByText(/CHP#1/i);
    fireEvent.click(chapter1);

    const category1 = screen.getByText(/Category 1/i);
    expect(category1).toBeInTheDocument();
  });

  test('displays questions when a category is selected', () => {
    render(
      <AppProvider>
        <Sidebar />
      </AppProvider>
    );

    const chapter1 = screen.getByText(/CHP#1/i);
    fireEvent.click(chapter1);

    const category1 = screen.getByText(/Category 1/i);
    fireEvent.click(category1);

    const question1 = screen.getByText(/What is the capital of Germany?/i);
    expect(question1).toBeInTheDocument();
  });
});
