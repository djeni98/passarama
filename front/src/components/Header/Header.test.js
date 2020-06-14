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
