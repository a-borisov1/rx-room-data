import React from 'react';
import { Subject } from 'rxjs';
import { Dashboard } from './dashboard';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Dashboard Component', function () {
  let mockDashboard$;
  let sut;
  beforeEach(function () {
    mockDashboard$ = new Subject();
    sut = <Dashboard dashboard$={mockDashboard$} />;
  });

  it('should render 3 items', function () {
    expect(shallow(sut).props().children).toHaveLength(3);
  });
});
