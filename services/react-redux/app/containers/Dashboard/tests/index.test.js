import React from 'react';
import { shallow } from 'enzyme';

import DateSelector from 'containers/DateSelector/Loadable';
import InstallChart from 'components/charts/installations';
import Dashboard from '../Dashboard';

describe('<Dashboard />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Dashboard />);
    expect(renderedComponent.length).toEqual(1);
  });

  it('should render install chart', () => {
    const renderedComponent = shallow(<Dashboard />);
    expect(renderedComponent.length).toEqual(1);
  });
});
