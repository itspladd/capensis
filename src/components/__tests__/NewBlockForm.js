import React from 'react';
import ReactDOM from 'react-dom';
import NewBlockForm from '../NewBlockForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewBlockForm />, div)
})