import React from 'react';

import { updateInfo } from './rx/valuesGen';
import { generateData } from './rx/timeGen';
import { Dashboard } from './components/dashboard';

import './App.css';

const temperature$ = generateData({
  minDelay: 40,
  maxDelay: 250,
  minValue: 15,
  maxValue: 26,
});

const humidity$ = generateData({
  minDelay: 300,
  maxDelay: 2500,
  minValue: 75,
  maxValue: 105,
});

const pressure$ = generateData({
  minDelay: 130,
  maxDelay: 250,
  minValue: 60,
  maxValue: 100,
});

const dashboard$ = updateInfo(temperature$, humidity$, pressure$).map(
  ([temperature, humidity, pressure]) => ({
    temperature,
    humidity,
    pressure,
  })
);

export const App = () => (
  <div className="App">
    <Dashboard dashboard$={dashboard$} />
  </div>
);
