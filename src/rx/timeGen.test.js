import { generateData } from './timeGen';

const sensorConfig = {
  minDelay: 100,
  maxDelay: 200,
  minValue: 10,
  maxValue: 20,
};

const sut = generateData(sensorConfig);
jest.useFakeTimers();

describe('Sensor Mock', function () {
  describe('Emit interval', function () {
    const { minDelay, maxDelay } = sensorConfig;

    it.only('should NOT emit a value too early', () => {
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      jest.advanceTimersByTime(minDelay - 1);

      expect(subscriber).not.toBeCalled();
    });

    test('should emit a value within max delay', () => {
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      jest.advanceTimersByTime(maxDelay);
      jest.advanceTimersByTime(maxDelay);
      jest.advanceTimersByTime(maxDelay);
      expect(subscriber.mock.calls.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Emit value rang', function () {
    const { maxValue, minValue, maxDelay } = sensorConfig;

    test('should emit a value within a given range', () => {
      const subscriber = jest.fn();
      sut.subscribe(subscriber);
      jest.advanceTimersByTime(maxDelay);
      const outputValue = subscriber.mock.calls[0][0];

      expect(outputValue).toBeGreaterThanOrEqual(minValue);
      expect(outputValue).toBeLessThanOrEqual(maxValue);
    });
  });
});
