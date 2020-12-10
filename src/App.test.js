import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

test('renders ', () => {
  const elem = document.createElement('div');
  ReactDOM.render(<App />, elem);
  ReactDOM.unmountComponentAtNode(elem);
});
