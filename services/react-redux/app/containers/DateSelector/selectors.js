/**
 * DateSelector selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDate = (state) => {
  //console.log('SELECT DATE', state.dateselector, state, state.dateselector);
  if (state.dateselector) return state.dateselector;
  if (state.highcharts) return state.highcharts;
  return state.dateselector;
};

const makeSelectDate = () => createSelector(
  selectDate,
  (dateState) => {
   // console.log('SELECTOR ACTION DATE CHANGE ....', dateState);
    return dateState.date;
  }
);

export {
  selectDate,
  makeSelectDate,
};
