import React from 'react';
import ReactDOM from 'react-dom';
import ScheduleBar from '../ScheduleBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScheduleBar />, div)
})