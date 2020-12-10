import { Subject } from 'rxjs';

import { updateInfo } from './valuesGen';

describe('Dashboard', function () {
  let sut;
  let streamA;
  let streamB;
  let subscriber;

  beforeEach(() => {
    jest.useFakeTimers();
    streamA = new Subject();
    streamB = new Subject();
    sut = updateInfo(streamA, streamB);
    subscriber = jest.fn();
    sut.subscribe(subscriber);
  });

  it('should contain latest values from the streams', function () {
    const aValue = 'a';
    const bValue = 'b';
    streamA.next(aValue);
    streamB.next(bValue);

    expect(subscriber).toHaveBeenCalledWith([aValue, bValue]);
  });

  // it('should set source value to "NA" if not emited within 1000 ms', function () {
  //     const clock = lolex.install();
  //     const bValue = 'a';
  //     streamA.next('some value');
  //     clock.tick(1111);
  //     streamB.next(bValue);

  //     expect(subscriber).toHaveBeenCalledWith(['NA', bValue]);
  //     clock.uninstall()
  // });

  it('should NOT emit values more often that once per 100ms', function () {
    streamA.next('someValue');
    streamB.next('someOtherValue');
    subscriber.mockClear();
    jest.advanceTimersByTime(60);
    streamA.next('someValue');

    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should NOT emit before each stream sends a value', function () {
    streamA.next('some value');

    expect(subscriber).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should NOT emit when value switches to NA', function () {
    streamA.next();
    jest.advanceTimersByTime(500);
    streamB.next();

    subscriber.mockClear();
    jest.advanceTimersByTime(800);
    expect(subscriber).not.toHaveBeenCalled();
  });
});
