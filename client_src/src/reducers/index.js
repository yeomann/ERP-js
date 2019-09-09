import { combineReducers } from "redux";
// import routes from "./routesReducer.js";
// logout type
import { LOGOUT_CLEARSTORE, SESSION_EXPIRED_RESET_STORE } from "../actions/types";

// all reducers
// import InitAppReducer from "./initappReducer";
// import AuthReducer from "./authReducer";
// import AccountReducer from "./accountReducer";
import GeneralReducer from "./generalReducer";
import OrderReducer from "./orderReducer";

// console.log("Reducer INDEX called");

const appReducer = combineReducers({
  // routes,
  // initApp: InitAppReducer,
  // auth: AuthReducer,
  // accounts: AccountReducer,
  general: GeneralReducer,
  order: OrderReducer
});

//https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
  // console.log(action.type);

  if (action.type === LOGOUT_CLEARSTORE || action.type === SESSION_EXPIRED_RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};
/* eslint-enable no-param-reassign */

export default rootReducer;
