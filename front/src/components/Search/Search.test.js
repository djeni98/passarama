import React from 'react';
import api from '../api';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import SearchPage from './index.js';

import {
  mockGetArray as mockGet, pageAsyncContentTest,
  loadMoreTest, loadErrorTest,
} from '../test_utils';


const LIMIT = 12

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

function setup(search = '', data = [], error = false) {
  const history = createMemoryHistory();

  mockGet(data, error);

  history.push('/search?title=' + search);

  const { container } = render(
    <Router history={history}>
      <SearchPage />
    </Router>
  );

  return { history, container, data };
}

test('renders search page with no query', async () => {
  setup();
  
  // Search Bar
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /pesquisa/i });

  const footer = screen.getByRole('contentinfo');
  
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  expect(footer).toBeInTheDocument();
  await screen.findByRole('heading', { name: /resultado/i });
});

test('renders search page async content', async () => {
  const itemsFunction = (item) => {
    const title = screen.getByText(item.title);
    const fansub = screen.getByText(item.fansub);
    const link = screen.getByRole('link', { name: item.title });

    expect(title).toBeInTheDocument();

    expect(fansub).toBeInTheDocument();

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.link);
  }

  await pageAsyncContentTest(() => setup('search', createData(40)), LIMIT, itemsFunction);
});

test('loadMore button click loads more data', async () => {
  await loadMoreTest(() => setup('search', createData(40)), LIMIT, ['title', 'fansub']);
});

test('first search load error', async () => {
  await loadErrorTest(() => setup('', [], true));
});

test('loadMore load error', async () => {
  await loadErrorTest(async () => {
    setup('search', createData(40));
    const loadMoreButton = await screen.findByRole('button', { name: /mais/i });
    mockGet([], true);
    fireEvent.click(loadMoreButton);
  });
});
