/*
 * Sample component
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import store from './store';
import { addArticle } from './action';
import List from './List';
import Form from './Form';

window.store = store;
window.addArticle = addArticle;

export default class Sample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      articles: [
        { title: 'React Redux Tutorial for Beginners', id: 1 },
        { title: "Redux e React: cos'è Redux e come usarlo con React", id: 2 }
      ]
    };
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-4 offset-md-1">
          <h2>Articles</h2>
          <List />
        </div>
        <div className="col-md-4 offset-md-1">
          <h2>Add a new article</h2>
          <Form />
        </div>
      </div>
    );
  }
}

Sample.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeUsername: PropTypes.func
};
