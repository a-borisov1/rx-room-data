import React from 'react';
import { Subject } from 'rxjs';
import { Dashboard } from './dashboard';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.useFakeTimers();
const sensorConfig = {
  minDelay: 100,
  maxDelay: 200,
  minValue: 20,
  maxValue: 50,
};
describe('Dashboard Component', function () {
  const { minDelay } = sensorConfig;
  let mockDashboard$;
  let sut;
  beforeEach(function () {
    mockDashboard$ = new Subject();
    sut = <Dashboard dashboard$={mockDashboard$} />;
  });

  it('should not render with empty data', function () {
    jest.advanceTimersByTime(minDelay);
    expect(shallow(sut).props().children).toBeUndefined();
  });
});
