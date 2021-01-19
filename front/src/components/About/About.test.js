import React from 'react';
import api from '../api';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from './index.js';

import { mockGetObj as mockGet } from '../test_utils';

jest.mock('../api');

test('renders about page with info error', async () => {
  mockGet({}, true);

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
  
  const infoTitle = screen.getByRole('heading', { name: /informaç(ão|ões)/i });
  const infosDesc = screen.getAllByRole('definition');

  expect(infoTitle).toBeInTheDocument();

  let infosContent = ['-','-', 'github'];
  infosDesc.forEach((info, index) =>
    expect(info).toHaveTextContent(infosContent[index])
  );

  const unavailableInfo = await screen.findAllByText(/não foi possível/i);
  
  expect(unavailableInfo).toHaveLength(2);

  expect(footer).toBeInTheDocument();
});

test('renders info section with success', async () => {
  const version = 'some version';
  const update = '2222-11-22';
  mockGet({ api_version: version, db_last_update: update });

  render(<About />, { wrapper: MemoryRouter });

  const [yyyy, mm, dd] = update.split('-');
  const db_update = await screen.findByText(new RegExp(yyyy));
  const api_version = await screen.findByText(new RegExp(version));
  
  expect(db_update).toHaveTextContent(yyyy);
  expect(db_update).toHaveTextContent(mm);
  expect(db_update).toHaveTextContent(dd);

  expect(api_version).toBeInTheDocument();
});
