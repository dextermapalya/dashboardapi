// export { default } from './Header';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/auth/reducer';
import authService from 'utils/authService';
// import saga from 'containers/auth/saga';

import { authLogout } from 'containers/auth/actions';
// import { makeSelectDate } from 'containers/DateSelector/selectors';
import {
  makeSelectUser, makeSelectAuthStatus,
} from 'containers/auth/selectors';
import history from 'utils/history';
import Header from './Header';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isLoggedIn: makeSelectAuthStatus(),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: (evt, isLoggedIn) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(authLogout(isLoggedIn));
    history.push('/');
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'authenticate', reducer });

export default compose(withReducer, withConnect)(Header);

// export default compose(withConnect)(Header);
export { mapDispatchToProps };
