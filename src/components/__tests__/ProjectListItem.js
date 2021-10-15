import React from 'react';
import ReactDOM from 'react-dom';
import ProjectListItem from '../ProjectListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectListItem />, div)
})