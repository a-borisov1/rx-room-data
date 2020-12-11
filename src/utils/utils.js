import { updateInfo } from '../core/values-gen';
import { generateData } from '../core/time-gen';

export const random = (min, max) => {
  return Math.floor(Math.random() * (1 + max - min)) + min;
};

export const generateObservable = (temperature, humidity, pressure) => {
  const temperature$ = generateData(temperature);

  const humidity$ = generateData(humidity);

  const pressure$ = generateData(pressure);

  const dashboard$ = updateInfo(temperature$, humidity$, pressure$).map(
    ([temperature, humidity, pressure]) => ({
      temperature,
      humidity,
      pressure,
    })
  );
  return dashboard$;
};
