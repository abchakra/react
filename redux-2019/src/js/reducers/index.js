import { ADD_ARTICLE, DATA_LOADED } from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: []
};
function rootReducer(state = initialState, action) {
  // When the action type matches a valid clause the reducer calculates the next state and returns a new object.
  if (action.type === ADD_ARTICLE) {
    // state.articles.push(action.payload);
    // First we can return a new state, ie a new JavaScript object with Object.assign.
    // This way we keep the original state immutable. Then we can use Array.prototype.
    // concat in place of Array.prototype.push for keeping the initial array immutable:
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  
  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  //   it should return at least the initial state when no action type matches.
  return state;
}
export default rootReducer;
