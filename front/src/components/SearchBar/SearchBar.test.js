import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index.js';

function setup(props) {
  render(<SearchBar callback={console.log} {...props} />)

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  return { input, button }
}

test('renders search bar', () => {
  const { input, button } = setup();

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('return value on button click', () => {
  const searchInput = 'my search';

  let searchValue = null;
  const callback = (value) => searchValue = value;
  const { input, button } = setup({ callback });

  fireEvent.change(input, { target: { value: searchInput } });
  fireEvent.click(button);

  expect(input).toHaveValue(searchInput);
  expect(searchValue).toBe(searchInput);
});

test('return value on press Enter', () => {
  const searchInput = 'my search';

  let searchValue = null;
  const callback = (value) => searchValue = value;
  const { input } = setup({ callback });

  fireEvent.change(input, { target: { value: searchInput } });
  // Key press need to receive code
  // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-455854112
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

  expect(input).toHaveValue(searchInput);
  expect(searchValue).toBe(searchInput);
});
