/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import cloneDeep from 'lodash';
import { getDate, formatDate } from 'utils/DateFunctions';

import { CHANGE_DATE } from './constants';

// The initial state of the App
const initialState = {
  date: formatDate(getDate()),
  modified: false
};

function dateReducer(state = initialState, action) {
  console.log('DATE REDUCER');

  switch (action.type) {
    case CHANGE_DATE: {
      console.log('CHANGING_DATE......', action);
      // set any checks or filters here
      return { ...state, modified: true, date: formatDate(action.date) };
    }

    default:
      console.log('CHANGING DATE', state);
      return state;
  }
}

export default dateReducer;
