import React from 'react';
import ReactDOM from 'react-dom';
import DaySchedule from '../DaySchedule';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DaySchedule />, div)
})