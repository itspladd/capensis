import React from 'react';
import ReactDOM from 'react-dom';
import WeekSchedule from '../WeekSchedule';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeekSchedule />, div)
})