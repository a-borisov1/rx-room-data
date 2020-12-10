import { of, timer } from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/repeat';

const random = (min, max) => {
  return min + Math.ceil(Math.random() * (max - min));
};

export const generateData = (props) => {
  const { minDelay, maxDelay, minValue, maxValue } = props;

  return of('')
    .switchMap(() =>
      timer(random(minDelay, maxDelay)).mapTo(random(minValue, maxValue))
    )
    .repeat();
};
