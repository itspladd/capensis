import React from 'react';
import ReactDOM from 'react-dom';
import BlockList from '../BlockList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BlockList />, div)
})