import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { makeSelectLogin, makeSelectUserName, makeSelectPassword } from './selectors';

import { login, changeUserName, changePassword } from './actions';
import loginReducer from './reducer';
import saga from './saga';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  onChangePassword: (evt) => dispatch(changeUserName(evt.target.value)),
  onChangeUsername: (evt) => dispatch(changePassword(evt.target.value)),
  //onSubmitForm: (evt) => dispatch(login()),

  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(login());
  }
});

const mapStateToProps = createStructuredSelector({
  userinfo: makeSelectLogin(),
  username: makeSelectUserName(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', loginReducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };
