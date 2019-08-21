import React from 'react';
import { shallow, render } from 'enzyme';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Template from 'containers/Template/Loadable';
import Login from 'components/Login';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PublicLayout from 'containers/Template/public';
import PrivateLayout from 'containers/Template/private';
import LoadingIndicator from 'components/LoadingIndicator';
import { MemoryRouter } from 'react-router';

import App from '../index';

describe('<Template />', () => {
  it('should render the header', () => {
    const renderedComponent = shallow(<Template />);
    console.log(renderedComponent.debug());
    expect(renderedComponent.find(LoadingIndicator).length).toBe(1);
  });


  /* it('should render some routes', () => {
    const renderedComponent = shallow(<Template />);
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('should not render the footer', () => {
    const renderedComponent = shallow(<Template />);
    expect(renderedComponent.find(Footer).length).toBe(0);
  }); */
});
