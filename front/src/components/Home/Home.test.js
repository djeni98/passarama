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

import React from 'react'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './index.js';

function setup() {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <Home />
    </Router>
  );

  // Waiting for landmark role support
  // https://github.com/testing-library/dom-testing-library/issues/578#issuecomment-633705209
  // https://github.com/A11yance/aria-query/pull/46
  const logoTitle = container.querySelector('h1');

  const logoImg = screen.getByRole('img', { name: /logo/i });
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /pesquisa/i });

  const footer = screen.getByRole('contentinfo');

  return { logoTitle, logoImg, searchInput, searchButton, history };
}

test('renders home page', () => {
  const { logoTitle, logoImg, searchInput, searchButton } = setup();

  const footer = screen.getByRole('contentinfo');
  
  expect(logoTitle).toBeInTheDocument();
  expect(logoTitle).toHaveTextContent('Passarama');

  expect(logoImg).toBeInTheDocument();

  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  expect(footer).toBeInTheDocument();
});

test('navigates to search with no search content', () => {
  const { searchButton, history } = setup();

  expect(history.location.pathname).toBe('/');
  
  fireEvent.click(searchButton);
  expect(history.location.pathname).toBe('/search');
  expect(history.location.search).toMatch(/=$/);
});

test('navigates to search with search content', () => {
  const { searchInput, searchButton, history } = setup();
  const searchValue = 'my search';

  expect(history.location.pathname).toBe('/');
  
  fireEvent.change(searchInput, { target: { value: searchValue } });
  fireEvent.click(searchButton);

  expect(history.location.pathname).toBe('/search');
  expect(history.location.search).toMatch('='+searchValue);
});
