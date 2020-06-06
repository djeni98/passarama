import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index.js';

test('renders search bar', () => {
  render(<SearchBar callback={console.log} />)

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('return value on button click', () => {
  let searchValue = null;
  const searchInput = 'my search';

  render(<SearchBar callback={(value) => searchValue = value} />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  fireEvent.change(input, { target: { value: searchInput } });
  fireEvent.click(button);

  expect(input).toHaveValue(searchInput);
  expect(searchValue).toBe(searchInput);
});

test('return value on press Enter', () => {
  let searchValue = null;
  const searchInput = 'my search';

  render(<SearchBar callback={(value) => searchValue = value} />);

  const input = screen.getByRole('textbox');

  fireEvent.change(input, { target: { value: searchInput } });
  // Key press need to receive code
  // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-455854112
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

  expect(input).toHaveValue(searchInput);
  expect(searchValue).toBe(searchInput);
});
