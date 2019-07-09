import React from 'react';
import './style.scss';
import {
  Switch, Route, NavLink, Link
} from 'react-router-dom';

const Billboard = (props) => (
  <section>
    <h1>{props.title}</h1>
    <div className="billboard_product" name={props.title}>
      <Link className="billboard_product-image" to="/">
        <img alt="#" src="#" />
      </Link>
      <div className="billboard_product-details">
        <h3 className="sub">React</h3>
        <p>Lorem Ipsum</p>
      </div>
    </div>
  </section>
);

export default Billboard;
