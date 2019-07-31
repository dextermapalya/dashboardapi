// export { default } from './Header';


import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import injectReducer from 'utils/injectReducer';
// import saga from 'containers/auth/saga';

import { authLogout } from 'containers/auth/actions';
// import { makeSelectDate } from 'containers/DateSelector/selectors';
import reducer from 'containers/auth/reducer';
import Header from './Header';

const mapDispatchToProps = (dispatch) => ({
  onLogout: (evt, isLoggedIn) => {
    console.log('ONLOGOUT .....', dispatch);
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(authLogout(isLoggedIn));
  }
});

const withConnect = connect(null, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'auth', reducer });

export default compose(withConnect)(Header);

// export default compose(withConnect)(Header);
export { mapDispatchToProps };
