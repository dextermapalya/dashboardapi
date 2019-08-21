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

// import React from 'react';
// import { shallow } from 'enzyme';

// import ListItem from 'components/ListItem';
// import List from '../index';

// describe('<List />', () => {
//   it('should render the component if no items are passed', () => {
//     const renderedComponent = shallow(<List component={ListItem} />);
//     expect(renderedComponent.find(ListItem)).toBeDefined();
//   });

//   it('should pass all items props to rendered component', () => {
//     const items = [{ id: 1, name: 'Hello' }, { id: 2, name: 'World' }];

//     const component = ({ item }) => <ListItem>{item.name}</ListItem>; // eslint-disable-lin$

//     const renderedComponent = shallow(
//       <List items={items} component={component} />
//     );
//     expect(renderedComponent.find(component)).toHaveLength(2);
//     expect(renderedComponent.find(component).at(0).prop('item')).toBe(items[0]);
//     expect(renderedComponent.find(component).at(1).prop('item')).toBe(items[1]);
//   });
// });
