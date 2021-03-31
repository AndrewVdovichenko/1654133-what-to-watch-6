import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundView from './not-found-view';

it(`NotFoundView should render correctly`, () => {
  const history = createMemoryHistory();

  render(
      <Router history={history}>
        <NotFoundView />
      </Router>
  );

  expect(screen.getByText(`Page Not Found`)).toBeInTheDocument();
  expect(screen.getByText(`Go to the`)).toBeInTheDocument();
});
