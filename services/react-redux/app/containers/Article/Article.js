/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    /* this.state = {
      article: { id: '', title: '', content: '' }
    } */
    console.log('ARTICLE constructor....');

    this.validateForm = this.validateForm.bind(this);
    // this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { title, onChangeTitle } = this.props;
    // onPageLoad(); //defined in index.js
    console.log('ARTICLE COMPONENT....');
  }


  validateForm(e) {
    const self = this;
    const { onSaveArticle, article, title } = this.props;
    e.preventDefault();
    console.log('VALIDATING', title, article);
    onSaveArticle(e, article);
  }


  render() {
    const self = this;

    const {
      loading,
      error,
      articles,
      title,
      article,
      onChangeTitle,
      onSaveArticle,
      onChangeArticleTitle,
      onChangeArticleContent,
    } = this.props;

    const {
      articleA
    } = this.state;

    console.log('PROPS', this.props);


    const articleListProps = {
      loading,
      error,
      articles
    };


    return (
      <article>
        <Helmet>
          <title>Article Sample Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate for array of data"
          />
        </Helmet>
        <section>
          <form onSubmit={this.validateForm}>
            <div className="form-group">
              <label htmlFor="title">Title
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title}
                  required
                  onChange={onChangeTitle}
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="title1">Article Title
                <input
                  type="text"
                  className="form-control"
                  id="title1"
                  name="title1"
                  value={article.title}
                  onChange={onChangeArticleTitle}
                />
              </label>
              <b>
                {article.content}
**
              </b>
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={article.content}
                onChange={onChangeArticleContent}
              />

            </div>

            <button type="submit" className="btn btn-success btn-lg">
            SAVE
            </button>
          </form>

        </section>
        <section>
          {/* <ArticleList {...articleListProps} /> */}
        </section>


      </article>
    );
  }
}

Article.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  articles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  title: PropTypes.string,
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  }),
  onChangeTitle: PropTypes.func,
  onSaveArticle: PropTypes.func,
  onChangeArticleContent: PropTypes.func,
  onChangeArticleTitle: PropTypes.func,
};
