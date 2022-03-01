import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './features/nav/HomePage';

test('renders PegBoard', () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );

  expect(getByText(/PegBoard/i)).toBeInTheDocument();
});
