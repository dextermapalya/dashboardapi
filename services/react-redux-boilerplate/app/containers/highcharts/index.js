import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRegistrationChart,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadRegistrationChart } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import TimeSeries from './TimeSeries';

const mapDispatchToProps = (dispatch) => ({
  fetchData: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRegistrationChart());
  }
});

const mapStateToProps = createStructuredSelector({
  registration_chartdata: makeSelectRegistrationChart(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(TimeSeries);
export { mapDispatchToProps };
