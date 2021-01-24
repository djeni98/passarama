/* Passarama - Find doramas and brazilian fansubs.
 * Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
