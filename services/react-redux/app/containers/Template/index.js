import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/auth/reducer';
import {
  makeSelectUser, makeSelectAuthStatus,
  makeSelectTokenExpired
} from 'containers/auth/selectors';
import {
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import Log from 'logger-init';
import Template from './Template';

Log.info('Loading template');

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isLoggedIn: makeSelectAuthStatus(),
  tokenExpired: makeSelectTokenExpired()
});

const withReducer = injectReducer({ key: 'authenticate', reducer });
const withConnect = connect(mapStateToProps, null);
// export default compose(withConnect)(Template);
export default compose(withReducer, withConnect)(Template);
