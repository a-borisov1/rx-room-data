import { combineLatest, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

const MAX_DELAY = 1000;
const REQUEST_INTERVAL = 100;

export const updateInfo = (...sources$) => {
  const timedData$ = sources$.map((data$) => {
    const defaultData$ = data$.pipe(debounceTime(MAX_DELAY)).mapTo('N/A');
    return merge(data$, defaultData$).timestamp();
  });

  return combineLatest(timedData$, (...data) => {
    const changed = data.slice().sort((a, b) => b.timestamp - a.timestamp)[0];

    const values = data.map((s) => s.value);
    return {
      values,
      trigger: changed.value,
    };
  })
    .throttleTime(REQUEST_INTERVAL)
    .filter(({ trigger }) => trigger !== 'N/A')
    .map(({ values }) => values);
};
