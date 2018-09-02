import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import issues from "./issues";
import comments from "./comments";

const rootReducer = combineReducers({
  issues,
  comments,
  routing: routerReducer
});
export default rootReducer;
