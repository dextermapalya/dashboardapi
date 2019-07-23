import React from 'react';
import { shallow, mount } from 'enzyme';
import logo from 'assets/images/logo.png';

import Header from '../index';

const delay = (ms) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});


const Nav = () => (<nav className="navbar navbar-static-top" />);

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.length).toEqual(1);
  });

  it('should render the toggle button', () => {
    const renderedComponent = shallow(<Header />);
    expect(
      renderedComponent.contains(<img alt="" src={logo} className="header_logo" />)
    ).toEqual(true);
  });

  it('should render the toggle button', async () => {
    const renderedComponent = shallow(<Header />);
    // console.log(renderedComponent.debug());
    // const headerComponent = mount(<Header />);
    const buttonInstance = renderedComponent.find('nav');

    console.log(buttonInstance.debug());
    console.log(buttonInstance.props.className);
    // expect(buttonInstance.hasClass('navbar').toEqual(true));
    // expect(buttonInstance.props.className).hasClass('navbar').to.equal(true);


    // const buttonInstance = headerComponent.find('nav').closest('button');
    // expect(buttonInstance.props.className).toBe('.minimalize-styl-2 btn btn-primary navbar_toggle');
    // buttonInstance.props.onClick();
    await delay(1);
  });
});
