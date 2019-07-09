import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectArticles,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';

import {
  loadArticles, changeTitle, saveArticle, changeArticleTitle, changeArticleContent
} from './actions';
import { makeSelectTitle, makeSelectArticle } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Article from './Article';


const mapDispatchToProps = (dispatch) => ({
  onChangeTitle: (evt) => dispatch(changeTitle(evt.target.value)),
  onChangeArticleTitle: (evt) => dispatch(changeArticleTitle(evt.target.value)),
  onChangeArticleContent: (evt) => dispatch(changeArticleContent(evt.target.value)),
  onLoadArticles: (evt) => dispatch(loadArticles()),
  onSaveArticle: (evt, article) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    console.log('DISPATCHING ACTION SUBMIT FORM', article);
    dispatch(saveArticle(article));
  }
});

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
  title: makeSelectTitle(),
  loading: makeSelectLoading(),
  article: makeSelectArticle(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'blog', reducer });
const withSaga = injectSaga({ key: 'blog', saga });
export default compose(withReducer, withSaga, withConnect)(Article);
export { mapDispatchToProps };
