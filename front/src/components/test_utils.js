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
