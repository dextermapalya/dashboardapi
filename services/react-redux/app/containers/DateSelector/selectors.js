/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
//import { initialState } from './reducer';

const selectDate = (state) => {
  console.log('SELECT DATE', state.dateselector)
  return state.dateselector
} 
//const selectGlobal = (state) => state.global || initialState;

const makeSelectDate = () => createSelector(
  selectDate,
  (dateState) => dateState.date
);

export {
  makeSelectDate,
};
