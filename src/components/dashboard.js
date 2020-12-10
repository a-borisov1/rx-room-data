import React, { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Item } from './item';

export const Dashboard = ({ dashboard$ }) => {
  const unsubscribe$ = new Subject();

  const [state, setState] = useState({
    temperature: '--',
    pressure: '--',
    humidity: '--',
  });

  useEffect(() => {
    dashboard$.pipe(takeUntil(unsubscribe$)).subscribe((newState) => {
      setState(newState);
    });
    return function cleanup() {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [dashboard$]);

  return (
    <div
      className="dashboard"
      style={{ border: '1px solid grey', maxWidth: '20rem', padding: '2rem' }}
    >
      <Item name="Temperature" value={state.temperature} />
      <Item name="Humidity" value={state.humidity} />
      <Item name="Pressure" value={state.pressure} />
    </div>
  );
};
