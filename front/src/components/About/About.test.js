import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from './index.js';

test('renders about page', () => {
  const { container } = render(<About />, { wrapper: MemoryRouter });

  const header = container.querySelector('header');

  const whatIsIt = screen.getByRole('heading', { name: /o que é/i });
  const howItWorks = screen.getByRole('heading', { name: /como funciona/i });
  const steps = screen.getAllByRole('listitem');

  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();

  expect(whatIsIt).toBeInTheDocument();
  expect(whatIsIt).toHaveTextContent('O que é o Passarama');

  expect(howItWorks).toBeInTheDocument();
  expect(howItWorks).toHaveTextContent('Como funciona');

  const expectedSteps = [
    'Um programa inspeciona os sites das fansubs procurando doramas',
    'O título, link e fansub são guardados em um banco de dados',
    'O Passarama consulta esse banco de dados para pesquisar doramas'
  ];

  steps.forEach((step, index) => {
    expect(step).toHaveTextContent(expectedSteps[index]);
  });

  expect(footer).toBeInTheDocument();
});
