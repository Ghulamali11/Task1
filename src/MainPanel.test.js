// MainPanel.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './AppContext';
import MainPanel from './MainPanel';

describe('MainPanel Component', () => {
  test('displays chapter and category title correctly', () => {
    render(
      <AppProvider>
        <MainPanel />
      </AppProvider>
    );

    // Ensure that "CHP#1" title is rendered as a placeholder
    const chapterTitle = screen.getByText(/Please select a chapter./i);
    expect(chapterTitle).toBeInTheDocument();
  });

  test('displays questions when a chapter and category are selected', () => {
    render(
      <AppProvider>
        <MainPanel />
      </AppProvider>
    );

    // Select Chapter 1
    fireEvent.click(screen.getByText(/CHP#1/i));

    // Select Category 1
    fireEvent.click(screen.getByText(/Category 1/i));

    // Verify that questions from Category 1 are shown
    const questionText = screen.getByText(/What is the capital of Germany?/i);
    expect(questionText).toBeInTheDocument();
  });

  test('pagination controls work correctly', () => {
    render(
      <AppProvider>
        <MainPanel />
      </AppProvider>
    );

    // Select Chapter 1 and Category 1
    fireEvent.click(screen.getByText(/CHP#1/i));
    fireEvent.click(screen.getByText(/Category 1/i));

    // Check for Next Page button
    const nextPageButton = screen.getByText(/Next/i);
    fireEvent.click(nextPageButton);

    // Ensure that the page changes (this will depend on how you display questions)
    expect(screen.getByText(/Page 2/)).toBeInTheDocument();
  });

  test('question expands when clicked', () => {
    render(
      <AppProvider>
        <MainPanel />
      </AppProvider>
    );

    // Select Chapter 1 and Category 1
    fireEvent.click(screen.getByText(/CHP#1/i));
    fireEvent.click(screen.getByText(/Category 1/i));

    // Click on a question to expand it
    const question1 = screen.getByText(/What is the capital of Germany?/i);
    fireEvent.click(question1);

    // Verify that the question details are displayed
    const details = screen.getByText(/The capital of Germany is Berlin./i);
    expect(details).toBeInTheDocument();
  });
});
