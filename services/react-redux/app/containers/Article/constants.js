/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const CHANGE_ARTICLE_CONTENT = 'CHANGE_ARTICLE_CONTENT';
export const CHANGE_ARTICLE_TITLE = 'CHANGE_ARTICLE_TITLE';
