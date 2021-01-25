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
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index.js';

function setup() {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Header />
    </Router>
  );

  const homeLink = screen.getByRole('link', { name: /início/i });
  const searchLink = screen.getByRole('link', { name: /pesquisar/i });
  const fansubsLink = screen.getByRole('link', { name: /fansubs/i });
  const aboutLink = screen.getByRole('link', { name: /sobre/i });

  return { homeLink, searchLink, fansubsLink, aboutLink, history };
}

test('renders header', () => {
  const { homeLink, searchLink, fansubsLink, aboutLink } = setup();

  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute('href', '/');

  expect(searchLink).toBeInTheDocument();
  expect(searchLink).toHaveAttribute('href', '/search');

  expect(fansubsLink).toBeInTheDocument();
  expect(fansubsLink).toHaveAttribute('href', '/fansubs');

  expect(aboutLink).toBeInTheDocument();
  expect(aboutLink).toHaveAttribute('href', '/about');
});

test('navigates to home on home link click', () => {
  const { homeLink, history } = setup();

  expect(history.location.pathname).toBe('/');

  fireEvent.click(homeLink);
  expect(history.location.pathname).toBe('/');
});

test('navigates to search on search link click', () => {
  const { searchLink, history } = setup();

  expect(history.location.pathname).toBe('/');

  fireEvent.click(searchLink);
  expect(history.location.pathname).toBe('/search');
});

test('navigates to fansubs on fansubs link click', () => {
  const { fansubsLink, history } = setup();

  expect(history.location.pathname).toBe('/');

  fireEvent.click(fansubsLink);
  expect(history.location.pathname).toBe('/fansubs');
});

test('navigates to about on about link click', () => {
  const { aboutLink, history } = setup();

  expect(history.location.pathname).toBe('/');

  fireEvent.click(aboutLink);
  expect(history.location.pathname).toBe('/about');
});
