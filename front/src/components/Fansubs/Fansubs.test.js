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
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import Fansubs from './index.js';

import {
  mockGetArray as mockGet, pageAsyncContentTest,
  loadMoreTest, loadErrorTest,
} from '../test_utils';

jest.mock('../api');

const LIMIT = 10;

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

function setup(data = [], error = false) {
  mockGet(data, error);
  const { container } = render(<Fansubs />, { wrapper: MemoryRouter });
  return { container, data };
}

test('renders fansubs page structure', async () => {
  const { container } = setup();

  const header = container.querySelector('header');
  const fansubsTitle = screen.getByRole('heading', { name: /fansub/i });
  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();

  expect(fansubsTitle).toBeInTheDocument();
  expect(fansubsTitle).toHaveTextContent('Fansubs');

  expect(footer).toBeInTheDocument();

  await screen.findByRole('heading', { name: /resultado/i });
});

test('renders fansubs page async content', async () => {
  const itemsFunction = (item, index) => {
    const title = screen.getByText(item.name);
    const link = screen.getByRole('link', { name: item.link });

    expect(title).toBeInTheDocument();

    const facebook = screen.getAllByRole('link', { name: /facebook/i })[index];
    expect(facebook).toBeInTheDocument();
    expect(facebook).toHaveAttribute('href', item.facebook);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.link);
  }

  await pageAsyncContentTest(() => setup(createData(20)), LIMIT, itemsFunction);
});

test('loadMore button click loads more data', async () => {
  await loadMoreTest(() => setup(createData(20)), LIMIT, ['name', 'link']);
});

test('load error', async () => {
  await loadErrorTest(() => setup([], true));
});
