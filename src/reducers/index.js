import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NavigationReducer from "./NavigationReducer";

export default combineReducers({
  nav: NavigationReducer,
  auth: AuthReducer
});
