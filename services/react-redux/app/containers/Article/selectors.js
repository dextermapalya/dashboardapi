/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
//import { initialState } from './reducer';

const selectArticle = (state) => {
  console.log('SELECT ARTICLE', state.blog)
  return state.blog
} 
//const selectGlobal = (state) => state.global || initialState;

const makeSelectTitle = () => createSelector(
  selectArticle,
  (articleState) => articleState.title
);


const makeSelectArticle = () => createSelector(
  selectArticle,
  (articleState) => articleState.article
);


export {
  selectArticle,
  makeSelectTitle,
  makeSelectArticle
};
/*import { createSelector } from 'reselect';

const selectArticle = (state) => state.get('article');

const makeSelectTitle = () => createSelector(
  selectArticle,
  (articleState) => articleState.get('title')
);

export {
  selectArticle,
  makeSelectTitle,
};
*/
  
