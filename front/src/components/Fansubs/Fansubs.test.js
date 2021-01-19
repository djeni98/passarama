import React from 'react';
import api from '../api';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import Fansubs from './index.js';

jest.mock('../api');

function createData(items) {
  return [...Array(items).keys()].map(index => {
    const id = index + 1;
    return {
      name: `Fansub ${id}`,
      facebook: `www.facebook.com/${id}`,
      link: `www.fansub.com/${id}`
    };
  });
}

function mockGet(data = [], error = false) {
  api.get.mockImplementationOnce((url, { params }) => {
    const start = params.offset;
    const end = start + params.limit;

    if (error) {
      return Promise.reject({ message: 'some error' });
    }
    return Promise.resolve({ data: { total: data.length, results: data.slice(start, end) } });
  });

}

test('renders fansubs page', async () => {
  const data = createData(20);

  mockGet(data);

  const { container } = render(<Fansubs />, { wrapper: MemoryRouter });
  
  const header = container.querySelector('header');
  const fansubsTitle = screen.getByRole('heading', { name: /fansub/i });
  const loading = screen.getByRole('heading', { name: /carregando/i });
  const footer = screen.getByRole('contentinfo');
  
  expect(header).toBeInTheDocument();

  expect(fansubsTitle).toBeInTheDocument();
  expect(fansubsTitle).toHaveTextContent('Fansubs');

  expect(loading).toBeInTheDocument();
  expect(loading).toHaveTextContent('Carregando');

  expect(footer).toBeInTheDocument();

  const results = await screen.findByRole('heading', { name: /resultado/i });
  const loadMoreButton = screen.getByRole('button', { name: /mais/i });

  expect(results).toBeInTheDocument();
  expect(results).toHaveTextContent(data.length);

  // Default
  const offset = 0;
  const limit = 10;
  const partialData = data.slice(offset, limit);

  partialData.forEach(item => {
    const title = screen.getByText(item.name);
    const facebook = container.querySelector(`[href="${item.facebook}"]`);
    const link = screen.getByRole('link', { name: item.link });

    expect(title).toBeInTheDocument();

    expect(facebook).toBeInTheDocument();
    expect(facebook).toHaveAttribute('href', item.facebook);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.link);
  });
  
  expect(loadMoreButton).toBeInTheDocument();
  expect(loadMoreButton).toHaveTextContent('Mais Resultados'); 
});

test('loadMore button click loads more data', async () => {
  const data = createData(20);

  mockGet(data);

  const { container } = render(<Fansubs />, { wrapper: MemoryRouter });
  
  const loadMoreButton = await screen.findByRole('button', { name: /mais/i });

  let offset = 0;
  const limit = 10;
  let partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    expect(screen.getByText(item.name)).toBeInTheDocument()
  );
  
  mockGet(data);

  fireEvent.click(loadMoreButton);
  expect(loadMoreButton).not.toHaveTextContent('Mais Resultados');
  expect(loadMoreButton).toHaveTextContent('Carregando');

  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i));

  offset += limit;
  partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    expect(screen.getByText(item.name)).toBeInTheDocument()
  );
});

test('load error', async () => {
  mockGet([], true);

  const { container } = render(<Fansubs />, { wrapper: MemoryRouter });
  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i));

  expect(screen.queryByText(/resultado/i)).not.toBeInTheDocument();
  expect(screen.getByText(/erro/i)).toBeInTheDocument();
});
