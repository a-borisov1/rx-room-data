import React from 'react';

import { shallow } from 'enzyme';
import { Item } from './item';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Item Component', function () {
  const props = {
    name: 'test',
    value: 12,
  };
  it('should render item', function () {
    const wrapper = shallow(<Item {...props} />);

    expect(wrapper.find('.item')).toHaveLength(1);
    expect(wrapper.find('.item').props().children).toEqual(['test', ': ', 12]);
  });
});
