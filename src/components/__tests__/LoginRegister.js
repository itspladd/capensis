import React from 'react';
import ReactDOM from 'react-dom';
import LoginRegister from '../LoginRegister';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginRegister />, div)
})