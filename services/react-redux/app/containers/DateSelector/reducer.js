/*
 * DateSelectorReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { CHANGE_DATE } from './constants';
 import { getDate, formatDate } from 'utils/DateFunctions';


// The initial state of the App
export const initialState = {
  date: formatDate(getDate()),
  modified: false
};

function dateReducer(state = initialState, action) {
  console.log('DATE REDUCER', state);

  switch (action.type) {
    case CHANGE_DATE: {
      console.log('CHANGING_DATE......', action);
      // set any checks or filters here
      return { ...state, modified: true, date: formatDate(action.date) };
    }

    default:
      return state;
  }
}

export default dateReducer;
