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
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './index.js';

test('renders not found page', () => {
  const { container } = render(<NotFound />, { wrapper: MemoryRouter });

  const header = container.querySelector('header');

  const notFoundText = screen.getByRole('heading', { name: /encontrad[a,o]/i });
  const notFoundImg = screen.getByRole('img', { name: /encontrad[a,o]/i });

  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();

  expect(notFoundText).toBeInTheDocument();
  expect(notFoundText).toHaveTextContent('Página não encontrada');

  expect(notFoundImg).toBeInTheDocument();

  expect(footer).toBeInTheDocument();
});
