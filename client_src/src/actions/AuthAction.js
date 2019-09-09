// calling keychain to store login credentials on success
// keychain util functions
// import { SaveKeyChain, LoadKeyChain, ResetKeyChain } from "../util/keychain";
// import {
//   SaveKeyChain,
//   GetKeyChainSessionID
//   // LoadKeyChain
// } from "../util/keychain";
// import { getSessionID } from "../util/keychain";
// import { getCurrentLanguage } from "../i18n";
import { toast } from "react-toastify";

import {
  FORGET_PASSWORD_ACCOUNTID,
  LOGOUT_CLEARSTORE,
  RESET_AUTH_ERROR,
  ACCOUNTID_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUBMIT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL

  // GET_SESSION_ID,
  // REFRESHING_SESSION_ID,
  // REFRESHING_SESSION_ID_COMPLETED,
  // GET_SESSION_ID_BY_KEYCHAIN

  // REMOTE_VERIFY_SESSION_START,
  // REMOTE_VERIFY_SESSION_STRING_DOES_NOT_EXISTS,
  // REMOTE_VERIFY_SESSION_STRING_EXISTS,
  // REMOTE_VERIFY_SESSION_SUCCESS,
  // REMOTE_VERIFY_SESSION_FAIL,
  // REMOTE_VERIFY_SESSION_FINISHED
} from "./types";
import { API_BASE_URL, LOGIN_ENDPOINT } from "../api";

/*
 * ##############################
 *  Auth
 * ##############################
 */

export const ForgetPasswordAccountId = text => {
  console.log("Action Creator: Account ID change function is being called");
  return {
    type: FORGET_PASSWORD_ACCOUNTID,
    payload: text
  };
};
/**
 *   @desc LogOut call, just a action emitter, resting store is handled inside the index of reducers
 */
export const LogoutCall = history => dispatch => {
  // Remove saved data from sessionStorage
  window.sessionStorage.removeItem("foodishSession");
  dispatch({ type: LOGOUT_CLEARSTORE });

  Promise.resolve().then(() => {
    history.push("/login");
  });
};

console.log("Action creator INDEX called");
export const AccountIdChanged = text => {
  console.log("Action Creator: Account ID change function is being called");
  return {
    type: ACCOUNTID_CHANGED,
    payload: text
  };
};

export const PasswordChanged = text => {
  console.log("Action Creator: Password Changed func is being called");
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const resetAuthError = () => dispatch =>
  dispatch({
    type: RESET_AUTH_ERROR
  });

export const LoginUserCall = (email, password, history) => {
  const PostDataString = `email=${email}&password=${password}`;
  return dispatch => {
    // first let dispatch that we started working on fetch so loader can come
    dispatch({ type: LOGIN_USER_SUBMIT });

    return fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    })
      .then(response => response.json())
      .then(response => {
        console.log(`Success Response of Login: ${JSON.stringify(response)}`);
        // check for error object
        // if error object is undefined then this is a success
        if (typeof response["erorr"] === "undefined") {
          console.log("%c SAVING CREDENTIALS", "background: red; color: white");
          toast.success("Loading was successful! 😎", {
            autoClose: 1500,
            hideProgressBar: true
          });
          /**
           * first async save of credentials
           */
          window.sessionStorage.setItem("foodishSession", response.id);

          /**
           * Return successful payload
           */
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
              LoginMessage: "Loing was successful"
            }
          });
          // redirect on successful login
          window.location.href = "/";
          // history.replace("/erp-dashboard");
          return true;
        }
        dispatch({
          // return dispatch({
          type: LOGIN_USER_FAIL,
          payload: response.error.message
        });
        toast.error("Failed login to Server! 🤔");
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        // return dispatch({ type: LOGIN_USER_FAIL });
        dispatch({ type: LOGIN_USER_FAIL });
        return false;
      });
  };
};
