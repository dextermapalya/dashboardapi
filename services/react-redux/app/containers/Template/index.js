import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
    makeSelectUser, makeSelectAuthStatus,
    makeSelectTokenExpired
} from 'containers/auth/selectors';

import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
  

import Template from './Template';


const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    isLoggedIn: makeSelectAuthStatus(),
    tokenExpired: makeSelectTokenExpired()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Template);
//export { mapDispatchToProps };
