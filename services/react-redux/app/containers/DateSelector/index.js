import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import DateSelector from './DateSelector';

import { changeDate } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDate } from './selectors';


const mapDispatchToProps = (dispatch) => ({
  onChangeDate: (evt, date) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    console.log('DISPATCHING ACTION DATE CHANGE', date);
    dispatch(changeDate(date));
  }

});

const mapStateToProps = createStructuredSelector({
  currentDate: makeSelectDate(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dateselector', reducer });
// const withSaga = injectSaga({ key: 'dateselector', saga });
export default compose(withReducer, withConnect)(DateSelector);
export { mapDispatchToProps };
