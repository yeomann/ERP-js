import i18n from "i18n-js";
import RNLanguages from "react-native-languages";
// typings
import {
  // init first time Language
  APP_SET_LANGUAGE,
  APP_DEVICE_LANG_DETECT,
  APP_DEVICE_LANG_DETECT_SUCCESS,
  APP_DEVICE_LANG_DETECT_FAIL,
  // APP_DEVICE_LANG_DETECT_FINISHED,
  // init validation
  APP_INIT_VALIDATOR_STARTED,
  APP_IS_RUNNING_FIRST_TIME,
  APP_IS_NOT_RUNNING_FIRST_TIME,
  SET_APP_FIRST_TIME_START,
  SET_APP_FIRST_TIME_SUCCESS,
  // SET_APP_FIRST_TIME_FAIL,
  SET_APP_FIRST_TIME_FINISHED,
  APP_INIT_VALIDATOR_FINISHED,
  APP_SESSION_VALIDATOR_STARTED,
  APP_SESSION_VALIDATOR_SUCCESS,
  APP_SESSION_VALIDATOR_FAILED,
  APP_SESSION_VALIDATOR_FINISHED,
  APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR,
  APP_SESSION_VALIDATOR_LOADER_RESET,
  APP_HAS_LOGIN_CREDENTIALS,
  APP_DOES_NOT_HAS_LOGIN_CREDENTIALS,
  REFRESHING_SESSION_ID_STARTED,
  REFRESHING_SESSION_ID_SUCCESS,
  REFRESHING_SESSION_ID_FAILED,
  UPDATE_PUSH_NOTIFICATION_TOKEN,
  UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL,
  UPDATE_PUSH_NOTIFICATION_TOKEN_FINISHED,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED,
  // REFRESHING_SESSION_ID_COMPLETED,
  /* AUTO_PREPARING_PROFILES_STARTED,
	AUTO_PREPARING_PROFILES_FAILED,
	AUTO_PREPARING_PROFILES_SUCCESS,
	AUTO_PREPARING_PROFILES_SUCCESS_AUTO_SELECT */
  // REFRESHING_SESSION_ID,
  // REFRESHING_SESSION_ID_COMPLETED,
  SESSION_CHECK_START,
  SESSION_IS_VALID,
  SESSION_EXPIRED
} from "./types";
import {
  remoteValidateSessionID,
  getSessionFromKeychain,
  KeychainCredentialStatus,
  handleRemoteValidateResponse
} from "./commonAction.js";

// refresh session id incase we found keychain
import { LoginUserCall } from "./AuthAction";
// Generating Profile account lists
// import { GetAccountProfiles } from "./AccountAction";
// async storage to remember the skip of intro
import { StoreItem, RetrieveItem } from "../util/asyncStorage";
// load credentials
import { LoadKeyChain } from "../util/keychain";
import {
  API_BASE_URL,
  UPDATE_API_LANG,
  SET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT,
  GET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT,
  UPDATE_NOTIFICATION_TOKEN_ENDPOINT,
  ApiUtils
} from "../static/api";
// language
// import { getDeviceLang } from "../components/common/getDeviceLang";

/**
 *   @description Save "DID_APP_RUN_BEFORE" in AsyncStorage
 */
export const AppSetFirstTimeRun = () => async dispatch => {
  dispatch({ type: SET_APP_FIRST_TIME_START });
  await StoreItem("DID_APP_RUN_BEFORE", true);
  dispatch({
    type: SET_APP_FIRST_TIME_SUCCESS
  });
  dispatch({ type: SET_APP_FIRST_TIME_FINISHED });
};

/**
 *   @description get device language status OR get language from asyncStorage
 */
export const AppLangVerifier = () => dispatch =>
  new Promise((resolve, reject) => {
    console.log("AppLangVerifier is being called");

    dispatch({ type: APP_DEVICE_LANG_DETECT });
    // check for saved language if it is saved BEFORE i.e if app has been used BEFORE
    RetrieveItem("DeviceLanguage")
      .then(language => {
        console.log(`%c DeviceLanguage from STORAGE ${language}`, "background:red;color:white");
        // console.log(status);
        if (language === "en") {
          dispatch({
            type: APP_DEVICE_LANG_DETECT_SUCCESS,
            payload: "en"
          });
          i18n.locale = "en";
          return resolve("en");
        }
        // otherwise set the device local
        dispatch({
          type: APP_DEVICE_LANG_DETECT_FAIL,
          payload: "tr"
        });
        // i18n.locale = "tr";
        i18n.locale = RNLanguages.language;
        return resolve("tr");
      })
      .catch(error => {
        //  Handle errors for Redux
        dispatch({ type: APP_DEVICE_LANG_DETECT_FAIL });
        reject(error);
        return false;
      });
  });
//.then(() => dispatch({ type: APP_DEVICE_LANG_DETECT_FINISHED }));
export const AppLangSwitcher = newLanguage => {
  const PostDataString = `s_lang=${newLanguage}&b_debug=1`;

  return dispatch => {
    // change locally
    dispatch({
      type: APP_SET_LANGUAGE,
      payload: newLanguage
    });
    // change remotely
    //fetch(`${API_BASE_URL}${CHECK_PASSWORD}`, CHECK_PASSWORD, {
    return fetch(`${API_BASE_URL}${UPDATE_API_LANG}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    })
      .then(response => response.json())
      .then(response => {
        console.log(`Success Response:${JSON.stringify(response)}`);
        if (response.i_result === 1) {
          // return true && response.a_data.s_session_id;
          return true;
        }
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        return false;
      });
  };
  // dispatch({
  // 	type: APP_SET_LANGUAGE,
  // 	payload: newLanguage
  // });
};

/**
 *   @description checking and verifying “remember me and keychain and async data”
 *   Basic idea is that lets spilt this into 2 parts
 *   1 - lets check for async data which is for mainly to check "skipIntro" key.
 *   if skip intro is done, the go to Auth bucket
 *
 *   2 - in Auth bucket we will decide if the login info exists, if exists
 *   then we will attempt to refresh session and then proceed proceed to Preprofile
 *   in case of fail, we should you Login/Auth screen.
 */

export const AppInitVerifier = () => async dispatch => {
  dispatch({ type: APP_INIT_VALIDATOR_STARTED });
  await dispatch(appRunningFirstTime()).then(
    status => {
      console.log(`return of appRunningFirstTime() is ${status}`);
      dispatch({ type: "APP_INIT_FIRST_TIME_VALIDATOR_FINISHED" });
    },
    error => {
      console.log(error);
      dispatch({ type: "APP_INIT_VALIDATOR_FINISHED_WITH_ERROR" });
    }
  );
  /* dispatch({ type: "APP_INIT_LANGUAGE_VALIDATOR_STARTING" });
	await dispatch(AppLangVerifier()).then(
		status => {
			console.log(`return of AppLangVerifier() is ${status}`);
			dispatch({ type: "APP_INIT_LANGUAGE_VALIDATOR_FINISHED" });
		},
		error => {
			console.log(error);
			dispatch({
				type: "APP_INIT_LANGUAGE_VALIDATOR_FINISHED_WITH_ERROR"
			});
		}
	); */
  dispatch({ type: APP_INIT_VALIDATOR_FINISHED });
};

export const appRunningFirstTime = () => dispatch =>
  new Promise((resolve, reject) =>
    RetrieveItem("DID_APP_RUN_BEFORE")
      .then(status => {
        console.log(
          `%c APP_RUNNING_FIRST_TIME STATUS from STORAGE ${status}`,
          "background:red;color:white"
        );
        // console.log(status === true);

        if (status !== ("" || null)) {
          dispatch({ type: APP_IS_NOT_RUNNING_FIRST_TIME });
          return resolve(status);
        }
        dispatch({ type: APP_IS_RUNNING_FIRST_TIME });
        return resolve(status);
      })
      .catch(error => {
        //  Handle errors for Redux
        dispatch({ type: APP_IS_RUNNING_FIRST_TIME });
        reject(error);
        return false;
      })
  );
/**
 * @desc  Orchestrating Call For Internet usage history of TODAY
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the AccountDetailsCall()
 *  @see AccountDetailsCall
 * @return {Promise<Resolve, Reject>}
 */
export const AppSessionVerifierCall = () => async dispatch => {
  console.log(`AppSessionVerifierCall is being called`);
  dispatch({ type: APP_SESSION_VALIDATOR_STARTED });

  const credentialStatus = await KeychainCredentialStatus();
  console.log("%c credentialStatus ", "background:purple;color:white");
  console.log(credentialStatus);
  console.log(typeof credentialStatus, Object.keys(credentialStatus).length);
  /*
   * @desc If credentials Check is true, that means we have credentials
   * and we should regenerate the session Token
   * @see CallToRefreshSession helper function
   */
  if (Object.keys(credentialStatus).length > 1 && String(credentialStatus.password).length > 1) {
    dispatch({ type: APP_HAS_LOGIN_CREDENTIALS });
    return dispatch(
      CallToRefreshSession(credentialStatus.username, credentialStatus.password)
    ).then(
      loginStatus => {
        handleRemoteValidateResponse(loginStatus);
        if (loginStatus) {
          dispatch({ type: APP_SESSION_VALIDATOR_SUCCESS });

          dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
          // return dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
          // return true;
          dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
          return true;
          // return AppSessionVerifierFinishingCall();
          // return Promise.all(
          // 	getSessionFromKeychain().then(KeyChainSessionStr => {
          // 		console.log(JSON.stringify(KeyChainSessionStr));
          // 	})
          // );
        }
        dispatch({ type: APP_SESSION_VALIDATOR_FAILED });
        dispatch({ type: REFRESHING_SESSION_ID_FAILED });
        dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
        return false;
      },
      error => {
        //  Handle errors for Redux
        console.log(`possible internet error${error}`);
        dispatch({ type: REFRESHING_SESSION_ID_FAILED });
        dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
        return false;
      }
    );
    /* .then(async refreshProfile => {
				handleRemoteValidateResponse(
					`refreshProfile=${refreshProfile}`
				);
				if (refreshProfile) {
					dispatch({ type: "REFRESHING_PRE_PROFILE_STARTED" });
					return await getSessionFromKeychain().then(sessionStr => {
						dispatch({
							type: "REFRESHING_PRE_PROFILE_KEYCHAIN_DONE"
						});
						handleRemoteValidateResponse(
							`sessionStr=${sessionStr}`
						);
					});
				}
				return false;
			}); */
    /* .then(sessionStr => {
				handleRemoteValidateResponse(`sessionStr=${sessionStr}`);

				dispatch({
					type: "REFRESHING_PRE_PROFILE_FINISHED"
				});
			}); */
  }
  dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
  dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
  return false;
};

export const appSessionLoaderFalse = () => dispatch => {
  dispatch({ type: APP_SESSION_VALIDATOR_LOADER_RESET });
};

/*
 * if session was successfully refreshed then
 * we should refresh the pre-profile array as well
 */

/*
 * @desc call to submit user and password for new token
 */
export const CallToRefreshSession = (username, password) => dispatch =>
  new Promise((resolve, reject) => {
    console.log(`%c Starting CallToRefreshSession`, "background:purple;color:white");
    dispatch({ type: REFRESHING_SESSION_ID_STARTED });
    dispatch(LoginUserCall(username, password)).then(
      status => {
        console.log(`%c status ${status}`, "background: gold; color: white");
        if (status) {
          // dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
          return resolve(true);
        }
        // dispatch({ type: REFRESHING_SESSION_ID_FAILED });
        return resolve(false);
      },
      error => {
        //  Handle errors for Redux
        console.log("network error i think", error);
        // dispatch({ type: REFRESHING_SESSION_ID_FAILED });
        return reject(false);
      }
    );
    // .catch(error => {
    // 	//  Handle errors for Redux
    // 	dispatch({ type: REFRESHING_SESSION_ID_FAILED });
    // 	reject(error);
    // });
  });
//
//
//
// DELETE BELOW
//
//
//
export const AppSessionVerifier = () => dispatch =>
  new Promise((resolve, reject) =>
    // dispatch({ type: APP_SESSION_VALIDATOR_STARTED });
    // Before checking Credentials, we should if there's any internet
    // connection is available. otherwise no need to check for credentials etc.

    // check credentials for Keychain
    LoadKeyChain().then(
      loadedCredentials => {
        console.log(`%c LoadKeyChain from STORAGE`, "background:red;color:white");
        console.log(loadedCredentials);
        /* @desc loadedCredentials.username Returns OBJECT
         * so, now we need to understand that if credentials are not ZERO or undefined etc
         */
        if (
          String(loadedCredentials.username) !== 0 &&
          String(loadedCredentials.username) !== "null" &&
          String(loadedCredentials.username) !== "undefined" &&
          String(loadedCredentials.password) !== 0 &&
          String(loadedCredentials.password) !== "null" &&
          String(loadedCredentials.password) !== "undefined"
        ) {
          dispatch({ type: APP_HAS_LOGIN_CREDENTIALS });
          /*
           *   everything looks positive so far we can go to next Screen
           *   But we NEED TO REFRESH session id first
           *   @see CallToRefreshSession helper function
           */
          return dispatch(
            CallToRefreshSession(loadedCredentials.username, loadedCredentials.password)
          ).then(finalStatus => {
            console.log(`FinalStatus ${finalStatus}`);
            // If final status is true then we can go to next screen 100%
            if (finalStatus) {
              dispatch({
                type: APP_SESSION_VALIDATOR_SUCCESS
              });
              // return dispatch({
              // 	type: APP_SESSION_VALIDATOR_FINISHED
              // });
              return true;
            }
            dispatch({
              type: APP_SESSION_VALIDATOR_FAILED
            });
            // return dispatch({
            // 	type: APP_SESSION_VALIDATOR_FINISHED
            // });
            return false;
          });
        }
        dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
        // dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });

        resolve(loadedCredentials);
      },
      error => {
        //  Handle errors for Redux
        dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
        // dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
        reject(error);
      }
    )
  );
// .then(() => {
// 	dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
// });

/**
 * @desc  Orchestrating Call For Saving/Update Token for Notifications
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the updatePushNotificationToken()
 *  @see updatePushNotificationToken
 * @return {Promise<Resolve, Reject>}
 */
export const updatePushNotificationTokenCaller = firebaseToken => async dispatch => {
  console.log(`updatePushNotificationTokenCaller is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });
    dispatch({ type: UPDATE_PUSH_NOTIFICATION_TOKEN });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(updatePushNotificationToken(KeyChainSessionStr, firebaseToken)).then(
      status => {
        console.log(status);
        dispatch({ type: UPDATE_PUSH_NOTIFICATION_TOKEN_FINISHED });
      },
      error => {
        console.log(error);
        dispatch({
          type: "UPDATE_PUSH_NOTIFICATION_TOKEN_FINISHED_WITH_ERROR"
        });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};
/*
 * @summary Save / Update Token for Push Notifications
 */
export const updatePushNotificationToken = (sessionID, firebaseToken) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(
      `calling fetch API ${API_BASE_URL}${UPDATE_NOTIFICATION_TOKEN_ENDPOINT} with ${firebaseToken}`
    );
    const PostDataString = `session_id=${sessionID}&s_token=${firebaseToken}&b_debug=1`;
    fetch(`${API_BASE_URL}${UPDATE_NOTIFICATION_TOKEN_ENDPOINT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(response => {
        console.log(`Response updatePushNotificationToken= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          dispatch({
            type: UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS
          });
          resolve(response);
          return true;
        }
        dispatch({
          type: UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL
        });
        reject(response);
        return false;
      })
      .catch(error => {
        reject(error);
        console.log(`Error ${error}`);
        dispatch({
          type: UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL,
          payload: "Request Error"
        });
      });
  });

/**
 * @desc  Orchestrating Call For Turning On and Off Token Status of Push Notifications
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the setPushNotificationRemotePermission()
 *  @see setPushNotificationRemotePermission
 * @return {Promise<Resolve, Reject>}
 */
export const setPushNotificationRemotePermissionCaller = (
  selectedAccount,
  setBoolean
) => async dispatch => {
  dispatch({ type: SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION });

  console.log(`setPushNotificationRemotePermissionCaller is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  // SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION
  // SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS
  // SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL
  // SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(
      setPushNotificationRemotePermission(KeyChainSessionStr, selectedAccount, setBoolean)
    ).then(
      status => {
        console.log(status);
        dispatch({
          type: SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED
        });
      },
      error => {
        console.log(error);
        dispatch({
          type: "SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED_WITH_ERROR"
        });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};
/*
 * @summary Turning On and Off Token Status of Push Notifications
 */
export const setPushNotificationRemotePermission = (
  sessionID,
  selectedAccount,
  setBoolean
) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(
      `calling fetch API ${API_BASE_URL}${SET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT} with ${setBoolean}`
    );
    const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&b_on_off=${setBoolean}&b_debug=1`;
    fetch(`${API_BASE_URL}${SET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(response => {
        console.log(`Response setPushNotificationRemotePermission= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          dispatch({
            type: SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS
          });
          resolve(response);
          return true;
        }
        dispatch({
          type: SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL
        });
        reject(response);
        return false;
      })
      .catch(error => {
        reject(error);
        console.log(`Error ${error}`);
        dispatch({
          type: SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
          payload: "Request Error"
        });
      });
  });

/**
 * @desc  Orchestrating Call For Getting Status of Push Notifications
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the getPushNotificationRemoteStatus()
 *  @see getPushNotificationRemoteStatus
 * @return {Promise<Resolve, Reject>}
 */
export const getPushNotificationRemoteStatusCaller = selectedAccount => async dispatch => {
  dispatch({ type: GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION });

  console.log(`getPushNotificationRemoteStatusCaller is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  // GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION
  // GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS
  // GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL
  // GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(getPushNotificationRemoteStatus(KeyChainSessionStr, selectedAccount)).then(
      status => {
        console.log(status);
        dispatch({
          type: GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED
        });
      },
      error => {
        console.log(error);
        dispatch({
          type: "GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED_WITH_ERROR"
        });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};
/*
 * @summary Turning On and Off Token Status of Push Notifications
 */
export const getPushNotificationRemoteStatus = (sessionID, selectedAccount) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(
      `calling fetch API ${API_BASE_URL}${GET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT} with ${selectedAccount} and sessionID: ${sessionID}`
    );
    const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&b_debug=1`;
    fetch(`${API_BASE_URL}${GET_NOTIFICATION_REMOTE_PERMISSION_ENDPOINT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(async response => {
        console.log(`Response getPushNotificationRemoteStatus= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          // we must return b_status to read the remote status of push notifications
          dispatch({
            type: GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS,
            payload: response.a_data.b_status
          });
          await StoreItem("NOTIFICATION_SETTINGS_UPDATE_STATUS", response.a_data.b_status !== 0);
          resolve(response);
          return true;
        }
        dispatch({
          type: GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL
        });
        reject(response);
        return false;
      })
      .catch(error => {
        reject(error);
        console.log(`Error ${JSON.stringify(error)}`);
        dispatch({
          type: GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
          payload: "Request Error"
        });
      });
  });
