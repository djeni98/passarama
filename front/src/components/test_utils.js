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
import api from './api';
import { screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

export function mockGetObj(data = {}, error = false) {
  api.get.mockImplementationOnce((url) => {
    if (error) {
      return Promise.reject({ message: 'some error' });
    } else {
      return Promise.resolve({ data });
    }
  });
}

export function mockGetArray(data = [], error = false) {
  api.get.mockImplementationOnce((url, { params }) => {
    const start = params.offset;
    const end = start + params.limit;

    if (error) {
      return Promise.reject({ message: 'some error' });
    } else {
      return Promise.resolve({ data: { total: data.length, results: data.slice(start, end) } });
    }
  });
}

export async function pageAsyncContentTest(setupFunction, limit = 10, testItemsFunction = () => {}) {
  const { data } = setupFunction();

  const loading = screen.getByRole('heading', { name: /carregando/i });

  expect(loading).toBeInTheDocument();
  expect(loading).toHaveTextContent('Carregando');

  const results = await screen.findByRole('heading', { name: /resultado/i });
  const loadMoreButton = screen.getByRole('button', { name: /mais/i });

  expect(results).toBeInTheDocument();
  expect(results).toHaveTextContent(data.length);

  const offset = 0;
  const partialData = data.slice(offset, limit);

  partialData.forEach(testItemsFunction);
  
  expect(loadMoreButton).toBeInTheDocument();
  expect(loadMoreButton).toHaveTextContent('Mais Resultados'); 
}


export async function loadMoreTest(setupFunction, limit = 10, itemsAttr = []) {
  const { data } = setupFunction();

  const loadMoreButton = await screen.findByRole('button', { name: /mais resultado/i });

  let offset = 0;
  let partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    itemsAttr.forEach(attr =>
      expect(screen.getByText(item[attr])).toBeInTheDocument()
    )
  );

  mockGetArray(data);

  fireEvent.click(loadMoreButton);
  expect(loadMoreButton).not.toHaveTextContent('Mais Resultados');
  expect(loadMoreButton).toHaveTextContent('Carregando');

  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i));

  offset += limit;
  partialData = data.slice(offset, offset+limit);

  partialData.forEach(item =>
    itemsAttr.forEach(attr =>
      expect(screen.getByText(item[attr])).toBeInTheDocument()
    )
  );
}

export async function loadErrorTest(setupFunction) {
  await setupFunction();

  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i));

  expect(screen.queryByText(/resultado/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/erro/i)).toBeInTheDocument();
}
