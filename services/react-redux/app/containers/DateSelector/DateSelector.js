/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import DatePicker from 'react-datepicker';
import { getDate, formatDate } from 'utils/DateFunctions';

export default class DateSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      // currentDate: formatDate(new Date())
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // onPageLoad(); //defined in index.js
    console.log('DATE COMPONENT....', this.props);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
      // currentDate: formatDate(date)
    });
    const { onChangeDate } = this.props;
    console.log('SELECT DATE changed Dateselector', date);
    let e; // do not remove this line, because dispatch function requires the event and value
    // event has already been handled by datepicker
    onChangeDate(e, formatDate(date));
  }

  render() {
    const self = this;

    const {
      currentDate
    } = this.props;

    const { startDate } = this.state;

    console.log('PROPS1', this.props);


    return (
      <DatePicker
        placeholderText="Select a Date"
        selected={startDate}
        value={currentDate}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
      />
    );
  }
}

DateSelector.propTypes = {
  currentDate: PropTypes.string,
  onChangeDate: PropTypes.func,
};
