import React, { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { generateObservable } from '../utils/utils';

import { Item } from './item';

export const Dashboard = () => {
  const unsubscribe$ = new Subject();

  const temperatureState = {
    minDelay: 140,
    maxDelay: 250,
    minValue: 15,
    maxValue: 26,
  };

  const humidityState = {
    minDelay: 300,
    maxDelay: 2000,
    minValue: 75,
    maxValue: 105,
  };

  const pressureState = {
    minDelay: 130,
    maxDelay: 250,
    minValue: 60,
    maxValue: 100,
  };

  const dashboard$ = generateObservable(
    temperatureState,
    humidityState,
    pressureState
  );

  const [state, setState] = useState({
    temperature: dashboard$.temperature,
    pressure: dashboard$.pressure,
    humidity: dashboard$.humidity,
  });

  useEffect(() => {
    dashboard$.pipe(takeUntil(unsubscribe$)).subscribe((newState) => {
      setState(newState);
    });
    return function cleanup() {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  });

  const { temperature, pressure, humidity } = state;

  return (
    <div
      className="dashboard"
      style={{
        border: '1px solid grey',
        width: '8rem',
        height: '4rem',
        padding: '2rem',
      }}
    >
      {temperature && pressure && humidity && (
        <div>
          <Item name="Temperature" value={state.temperature} />
          <Item name="Humidity" value={state.humidity} />
          <Item name="Pressure" value={state.pressure} />
        </div>
      )}
    </div>
  );
};
