// import {     } from "../util/keychain";

// types
import {
  RESET_AUTH_ERROR,
  ACCOUNTID_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUBMIT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_SESSION_ID,
  REFRESHING_SESSION_ID,
  REFRESHING_SESSION_ID_COMPLETED,
  GET_SESSION_ID_BY_KEYCHAIN
  // SESSION_EXPIRED_RESET_STORE
} from "./../actions/types";
// get SessionID from keychain
// import { getSessionID } from "../util/keychain";

// initial states
const initialState = {
  accountID: "",
  password: "",
  loginLoader: false,
  loginuser: null,
  successStatus: false,
  successMsg: "",
  AppSessionID: "",
  errorStatus: false,
  errorMsg: null,
  refreshingSessionCompleted: false
};

// console.log("AUTH Reducer is called");

// switch cases
export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_AUTH_ERROR:
      return { ...state, errorStatus: false, errorMsg: null };
    case ACCOUNTID_CHANGED:
      console.log("Auth Reducer: switch statement: ACCOUNTID_CHANGED type is being called");
      //return action.payload;
      //update new stat and return
      return { ...state, accountID: action.payload };
    case PASSWORD_CHANGED:
      console.log("Auth Reducer: switch statement: PASSWORD_CHANGED type is being called ");
      // returning new state for entered password
      return { ...state, password: action.payload };
    case LOGIN_USER_SUBMIT:
      console.log(
        "Auth Reducer: switch statement: LOGIN_USER_SUBMIT is being called, best time for loader"
      );
      return { ...state, loginLoader: true };
    case LOGIN_USER_SUCCESS:
      console.log("payload containing message", action.payload);
      console.log(`login payload ${action.payload.LoginMessage}`);
      console.log(`loginID ${action.payload.LoginID}`);
      return {
        ...state,
        errorStatus: false,
        successStatus: true,
        loginLoader: false,
        successMsg: action.payload.LoginMessage,
        AppSessionID: action.payload.LoginID
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        errorStatus: true,
        errorMsg: action.payload,
        loginLoader: false
      };
    case GET_SESSION_ID:
      return { ...state };
    case REFRESHING_SESSION_ID:
      return { ...state, refreshingSessionCompleted: false };
    case REFRESHING_SESSION_ID_COMPLETED:
      return { ...state, refreshingSessionCompleted: true };
    case GET_SESSION_ID_BY_KEYCHAIN:
      return { ...state, AppSessionID: action.payload };
    default:
      return state;
  }
};
