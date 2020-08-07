import React from 'react';
import api from '../api';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import SearchPage from './index.js';

jest.mock('../api');

function createData(items) {
  return [...Array(items).keys()].map(index => {
    const id = index + 1;
    return {
      title: `Dorama ${id}`,
      fansub: `Fansub ${id}`,
      link: `www.dorama.com/${id}`
    };
  });
}

function mockGet(data = [], error = false) {
  api.get.mockImplementationOnce((url, { params }) => {
    const start = params.offset || 0;
    const end = start + params.limit;

    if (error) {
      return Promise.reject({ error: 'some error' });
    }
    return Promise.resolve({ data: { total: data.length, results: data.slice(start, end) } });
  });

}

function setup(search = null) {
  const history = createMemoryHistory();

  if (search) {
    history.push('/search', search);
  }

  const { container } = render(
    <Router history={history}>
      <SearchPage />
    </Router>
  );

  return { history, container };
}

test('renders search page with no query', async () => {
  setup();
  
  // Search Bar
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  const footer = screen.getByRole('contentinfo');
  
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  expect(footer).toBeInTheDocument();
});

test('renders search page', async () => {
  const data = createData(40);

  mockGet(data);

  setup('search');

  const loading = screen.getByRole('heading', { name: /carregando/i });
  
  expect(loading).toBeInTheDocument();
  expect(loading).toHaveTextContent('Carregando');

  const results = await screen.findByRole('heading', { name: /resultado/i });
  const loadMoreButton = screen.getByRole('button', { name: /resultado/i });

  expect(results).toBeInTheDocument();
  expect(results).toHaveTextContent(data.length);

  // Default
  const offset = 0;
  const limit = 10;
  const partialData = data.slice(offset, limit);

  partialData.forEach(item => {
    const title = screen.getByText(item.title);
    const fansub = screen.getByText(item.fansub);
    const link = screen.getByRole('link', { name: item.title });

    expect(title).toBeInTheDocument();

    expect(fansub).toBeInTheDocument();

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.link);
  });
  
  expect(loadMoreButton).toBeInTheDocument();
  expect(loadMoreButton).toHaveTextContent('Mais Resultados'); 
});

test('loadMore button click loads more data', async () => {
  const data = createData(40);

  mockGet(data);

  const { container } = setup('search');
  
  const loadMoreButton = await screen.findByRole('button', { name: /resultado/i });

  let offset = 0;
  const limit = 10;
  let partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    expect(screen.getByText(item.title)).toBeInTheDocument()
  );
  
  mockGet(data);

  fireEvent.click(loadMoreButton);
  expect(loadMoreButton).not.toHaveTextContent('Mais Resultados');
  expect(loadMoreButton).toHaveTextContent('Carregando');

  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i));

  offset += limit;
  partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    expect(screen.getByText(item.title)).toBeInTheDocument()
  );
});

