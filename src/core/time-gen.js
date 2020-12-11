import { of, timer } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/repeat';

import { random } from '../utils/utils';

export const generateData = (options) => {
  const { minDelay, maxDelay, minValue, maxValue } = options;

  return of('')
    .switchMap(() =>
      timer(random(minDelay, maxDelay)).mapTo(random(minValue, maxValue))
    )
    .repeat();
};
