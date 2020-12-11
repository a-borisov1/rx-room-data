import { of } from 'rxjs';
import lolex from 'lolex';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime, delay } from 'rxjs/operators';

import { generateData } from './time-gen';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

it('generate the stream correctly', () => {
  testScheduler.run((helpers) => {
    const { cold, expectObservable, expectSubscriptions } = helpers;
    const e1 = cold('-a--b--c---|');
    const subs = '^----------!';
    const expected = '-a-----c---|';
    expectObservable(e1.pipe(throttleTime(3, testScheduler))).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
});

const sensorConfig = {
  minDelay: 100,
  maxDelay: 200,
  minValue: 20,
  maxValue: 50,
};

const sut = generateData(sensorConfig);
jest.useFakeTimers();

describe('Sensor Mock', function () {
  describe('Emit interval', function () {
    const { maxDelay, minDelay } = sensorConfig;
    it('should NOT emit a value too early', () => {
      const clock = lolex.install();
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      clock.tick(minDelay - 1);
      expect(subscriber).not.toBeCalled();
      clock.tick(maxDelay - minDelay + 1);
      expect(subscriber).toBeCalled();
      clock.tick(maxDelay - minDelay + 1);
    });

    it('should emit a value within max delay', () => {
      const clock = lolex.install();
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      clock.tick(maxDelay);
      clock.tick(maxDelay);
      clock.tick(maxDelay);
      expect(subscriber.mock.calls.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Emit value rang', function () {
    const { maxValue, minValue, maxDelay } = sensorConfig;

    test('should emit a value within a given range', () => {
      const clock = lolex.install();
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      clock.tick(maxDelay);
      const outputValue = subscriber.mock.calls[0][0];

      expect(outputValue).toBeGreaterThanOrEqual(minValue);
      expect(outputValue).toBeLessThanOrEqual(maxValue);
    });
  });
});
