import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './components/App';

test('renders loading state initially', () => {
  const { getByText } = render(<App />);
  const loadingElement = getByText('Loading...');
  expect(loadingElement).toBeInTheDocument();
});

test('renders main content after loading', async () => {
  const { findByText, getByText } = render(<App />);

  // Wait for the loading state to finish
  await waitFor(() => expect(getByText('Loading...')).not.toBeInTheDocument());

  const homeText = await findByText('Welcome to the Quiz App');
  expect(homeText).toBeInTheDocument();
});
