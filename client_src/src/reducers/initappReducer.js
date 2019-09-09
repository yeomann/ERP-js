// types
import {
  APP_SET_LANGUAGE,
  APP_DEVICE_LANG_DETECT,
  APP_DEVICE_LANG_DETECT_SUCCESS,
  APP_DEVICE_LANG_DETECT_FAIL,
  APP_INIT_VALIDATOR,
  APP_INIT_VALIDATOR_FINISHED,
  APP_IS_NOT_RUNNING_FIRST_TIME,
  APP_IS_RUNNING_FIRST_TIME,
  APP_SESSION_VALIDATOR_STARTED,
  APP_SESSION_VALIDATOR_SUCCESS,
  APP_HAS_LOGIN_CREDENTIALS,
  APP_SESSION_VALIDATOR_FAILED,
  APP_SESSION_VALIDATOR_FINISHED,
  APP_SESSION_VALIDATOR_LOADER_RESET,
  APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR,
  REFRESHING_SESSION_ID_STARTED,
  APP_DOES_NOT_HAS_LOGIN_CREDENTIALS,
  AUTO_PREPARING_PROFILES_STARTED,
  AUTO_PREPARING_PROFILES_FAILED,
  AUTO_PREPARING_PROFILES_SUCCESS,
  AUTO_PREPARING_PROFILES_SUCCESS_AUTO_SELECT,

  // notification status handler
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
  SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL,
  GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED,
  SESSION_IS_VALID,
  SESSION_EXPIRED
} from "./../actions/types";

// initial states
const initialState = {
  // language
  app_save_lang: "en",
  // step 1
  appLoading: null,
  appRunningFirstTime: null,
  globalCurrentLocal: null, // can define Default Language
  // step 2
  appSessionLoader: null,
  appSessionLoadingMsg: false,
  refreshingSessionCompleted: false,

  refreshProfiles: null,
  profilesLoading: false,

  setNotificationLoader: false,
  setNotificationRemoteStatus: false,
  getNotificationLoader: false,
  getNotificationRemoteStatus: false,

  sessionExpired: false
};

// console.log("APP INIT Reducer is called");

// switch cases
export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_IS_VALID:
      return {
        ...state,
        sessionExpired: false
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        sessionExpired: true
      };
    // on opening check language
    case APP_DEVICE_LANG_DETECT:
      return { ...state };
    case APP_DEVICE_LANG_DETECT_SUCCESS:
      return { ...state, app_save_lang: action.payload };
    case APP_DEVICE_LANG_DETECT_FAIL:
      return { ...state, app_save_lang: action.payload };
    // on Opening app
    case APP_INIT_VALIDATOR:
      return { ...state, appLoading: true };
    case APP_IS_NOT_RUNNING_FIRST_TIME:
      return { ...state, appRunningFirstTime: false };
    case APP_IS_RUNNING_FIRST_TIME:
      return { ...state, appRunningFirstTime: true };
    case APP_INIT_VALIDATOR_FINISHED:
      return {
        ...state,
        appLoading: false
      };
    // if language is changed
    case APP_SET_LANGUAGE:
      return {
        ...state,
        globalCurrentLocal: action.payload
      };
    // if login-in before then we will refresh session automatically
    case APP_SESSION_VALIDATOR_STARTED:
      return {
        ...state,
        appSessionLoader: true,
        appSessionLoadingMsg: "loading"
      };
    case APP_HAS_LOGIN_CREDENTIALS:
      return {
        ...state,
        appSessionLoadingMsg: "foundCredentials"
      };
    case REFRESHING_SESSION_ID_STARTED:
      return {
        ...state,
        appSessionLoadingMsg: "refreshingSession"
      };
    case APP_SESSION_VALIDATOR_SUCCESS:
      return {
        ...state,
        appSessionLoadingMsg: "refreshingSessionSuccess"
      };
    case APP_DOES_NOT_HAS_LOGIN_CREDENTIALS:
      return {
        ...state,
        appSessionLoader: null,
        appSessionLoadingMsg: "noCredentialsFound"
      };
    case APP_SESSION_VALIDATOR_FAILED:
      return {
        ...state,
        appSessionLoader: null,
        appSessionLoadingMsg: "refreshingSessionFailed"
      };
    case APP_SESSION_VALIDATOR_FINISHED:
      return {
        ...state,
        refreshProfiles: true,
        // appSessionLoader: null,
        appSessionLoadingMsg: "finishLoading"
      };
    case APP_SESSION_VALIDATOR_LOADER_RESET:
      return {
        ...state,
        appSessionLoader: null
      };
    case APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR:
      return {
        ...state,
        appSessionLoader: null
      };
    // return { ...state, appSessionLoadingMsg: "loading" };
    // return { ...state };
    case AUTO_PREPARING_PROFILES_STARTED:
      return {
        ...state,
        profilesLoading: "loading"
      };
    case AUTO_PREPARING_PROFILES_FAILED:
      return {
        ...state,
        profilesLoading: "fail"
      };
    case AUTO_PREPARING_PROFILES_SUCCESS:
      return {
        ...state,
        profilesLoading: "success"
      };
    case AUTO_PREPARING_PROFILES_SUCCESS_AUTO_SELECT:
      return {
        ...state,
        profilesLoading: "loading"
      };
    case SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION:
      return {
        ...state,
        setNotificationLoader: true
      };
    case SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS:
      return {
        ...state,
        setNotificationRemoteStatus: true
      };
    case SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL:
      return {
        ...state,
        setNotificationRemoteStatus: false
      };
    case "SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED_WITH_ERROR":
      return {
        ...state,
        setNotificationLoader: false
      };
    case SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED:
      return {
        ...state,
        setNotificationLoader: false
      };
    case GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION:
      return {
        ...state,
        getNotificationLoader: true
      };
    case GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS:
      return {
        ...state,
        getNotificationRemoteStatus: action.payload !== 0 // this will return boolean
      };
    case GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL:
      return {
        ...state,
        getNotificationRemoteStatus: false
      };
    case "GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED_WITH_ERROR":
      return {
        ...state,
        getNotificationLoader: false
      };
    case GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED:
      return {
        ...state,
        getNotificationLoader: false
      };

    default:
      return state;
  }
};
