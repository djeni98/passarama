import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorDisplayer from './index.js';
import genericErrorImg from '../../assets/generic-error.svg';

test('renders message and image', () => {
  const message = 'Test Error';
  render(<ErrorDisplayer img={genericErrorImg} msg={message} />);

  const title = screen.getByText(message);

  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(message);
})
