import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './index.js';

test('renders not found page', () => {
  const { container } = render(<NotFound />, { wrapper: MemoryRouter });

  const header = container.querySelector('header');

  const notFoundText = screen.getByRole('heading', { name: /encontrad[a,o]/i });
  const notFoundImg = screen.getByRole('img', { name: /encontrad[a,o]/i });

  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();

  expect(notFoundText).toBeInTheDocument();
  expect(notFoundText).toHaveTextContent('Página não encontrada');

  expect(notFoundImg).toBeInTheDocument();

  expect(footer).toBeInTheDocument();
});
