import React from 'react';
import ReactDOM from 'react-dom';
import UserToUser from './Tables';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserToUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
