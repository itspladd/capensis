import React from 'react';
import ReactDOM from 'react-dom';
import NoAuthUser from '../NoAuthUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoAuthUser />, div)
})