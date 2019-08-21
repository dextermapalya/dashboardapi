import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import { changeDate } from 'containers/DateSelector/actions';
import { makeSelectDate } from 'containers/DateSelector/selectors';
import reducer from 'containers/DateSelector/reducer';
import ChartResource from './ChartResource';

const mapDispatchToProps = (dispatch) => ({
  onChangeDate: (evt, date) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    console.log('DISPATCHING ACTION SUBMIT FORM', date);
    dispatch(changeDate(date));
  }

});

const mapStateToProps = createStructuredSelector({
  currentDate: makeSelectDate(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'highcharts', reducer });
export default compose(withReducer, withConnect)(ChartResource);
export { mapDispatchToProps };
