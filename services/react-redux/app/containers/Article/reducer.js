/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_TITLE, LOAD_ARTICLES, 
         LOAD_ARTICLES_SUCCESS,
         SAVE_ARTICLE, 
         LOAD_ARTICLES_ERROR,
         CHANGE_ARTICLE_TITLE,
         CHANGE_ARTICLE_CONTENT,
        } from './constants';

// The initial state of the App
const initialState = {
  title: 'SAMPLE...',
  content:'',
  article:{'id':'', 'title':'', 'content':''}
}

function articleReducer(state = initialState, action) {
  switch (action.type) {
    
    case CHANGE_TITLE:
      console.log('CHANGING_TITLE......', action)
      //set any checks or filters here
      
      return { ...state, title: action.title , article: {title:action.title} };
      //return state.set('title', action.title);
      //state.set('article.title', action.title)

      case CHANGE_ARTICLE_TITLE:
          console.log('CHANGING_ARTICLE_TITLE......', action, state)
          //set any checks or filters here

          return { ...state, article: {title:action.title, content:state.content} };
          //return state.set('title', action.title);
          //state.set('article.title', action.title)

      case CHANGE_ARTICLE_CONTENT:
              console.log('CHANGING_ARTICLE_CONTENT......', action)
              //set any checks or filters here
              return { ...state, article: {content:action.content} };
              //return state.set('title', action.title);
              //state.set('article.title', action.title)
            
    case LOAD_ARTICLES: {
         console.log('LOADING ARTICLES......')
        const newState = {
          ...state,
          loading: true,
          error: false,
          articles: [],
        };
    
        return newState;
    }

    case SAVE_ARTICLE: {
      console.log( 'STATE SAVE_ARTICLE' )
      const newState = {
        ...state,
        loading: true,
        article: action.article,
      };
      console.log('STATE SAVE_ARTICLE' ,newState)
      return newState;
    }

    case LOAD_ARTICLES_SUCCESS: {
        const newState = {
          ...state,
          loading: false,
          articles: action.articles,
          username: action.username,
        };
        return newState;
    }
    
    case LOAD_ARTICLES_ERROR: {
        return { ...state, error: action.error, loading: false };
    }

    default:
      return state;
  }
}

export default articleReducer;

