import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
/* import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors'; */

// import { loadRepos } from '../App/actions';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
import reducer from './reducer';
// import saga from './saga';
import Sample from './Sample';
import { addArticle } from './action';

const mapDispatchToProps = (dispatch) => ({
  onAddArticle: (evt) => dispatch(addArticle(evt.target.value))
});

const mapStateToProps = (state) => ({ articles: state.articles });


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sample', reducer });

export default compose(withReducer, withConnect)(Sample);
// export default compose(withReducer, withSaga, withConnect, withHighcharts)(HomePage, Highcharts);

export { mapDispatchToProps };
