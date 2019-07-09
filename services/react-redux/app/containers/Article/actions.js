/*
 * Article Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_TITLE,
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
  SAVE_ARTICLE,
  CHANGE_ARTICLE_TITLE,
  CHANGE_ARTICLE_CONTENT
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {title} title The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {title} title The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeArticleTitle(title) {
  return {
    type: CHANGE_ARTICLE_TITLE,
    title
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {title} title The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeArticleContent(content) {
  return {
    type: CHANGE_ARTICLE_CONTENT,
    content
  };
}


/**
 * Load the articles, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTICLES
 */
export function saveArticle(article) {
  console.log('ACTION', SAVE_ARTICLE, article);
  return {
    type: SAVE_ARTICLE,
    article
  };
}


/**
 * Load the articles, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTICLES
 */
export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
  };
}

/**
 * Dispatched when the articles are loaded by the request saga
 *
 * @param  {array} articles The repository data
 * @param  {string} username The current username
 *
 * @return {object}  An action object with a type of LOAD_ARTICLES_SUCCESS passing the repos
 */
export function articlesLoaded(articles, username) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    articles,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function articlesLoadingError(error) {
  return {
    type: LOAD_ARTICLES_ERROR,
    error,
  };
}
