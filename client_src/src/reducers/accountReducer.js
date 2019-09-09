// Actions
import { Actions } from "react-native-router-flux";

// types
import {
  SESSION_EXPIRED,
  PROFILE,
  PROFILE_SUCCESS,
  PROFILE_SUCCESS_AUTO_SELECT,
  PROFILE_FAIL,
  ACCOUNT_DETAILS_CALL,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  CHANGE_TO_SPEED_GRAPHICS,
  CHANGE_TO_LEFTDAYS_GRAPHICS,
  // RECEIVED_USERINFO,
  GET_USERINFO,
  GET_INTERNET_USAGE_HISTORY,
  GET_INTERNET_USAGE_HISTORY_SUCCESS,
  GET_INTERNET_USAGE_HISTORY_FAIL,
  GET_INTERNET_USAGE_HISTORY_FINISHED,
  GET_INTERNET_USAGE_BY_DATE,
  GET_INTERNET_USAGE_BY_DATE_SUCCESS,
  GET_INTERNET_USAGE_BY_DATE_FAIL,
  GET_INTERNET_USAGE_BY_DATE_FINISHED,
  SESSION_EXPIRED_RESET_STORE
} from "../actions/types";

const _ = require("lodash");

// initial states
const initialState = {
  sessionExpired: false,
  accountsArray: "",
  accountArrayLength: 0,
  accountsLoading: false,
  AvailableAccStatus: false,
  accountDetailsLoading: false,
  accountDetailsStatus: false,
  accountDetails: {},
  accountUpgradeDetails: {},
  userInfo: {},
  selectedAccountInfo: {},
  showLeftDaysGraphics: true,
  showSpeedGraphics: false,
  // internet usage
  internetUsageByYearLoader: false,
  internetUsageByYearStatus: false,
  internetUsageByYearArray: [],
  internetUsageByDateLoader: false,
  internetUsageByDateStatus: false,
  internetUsageByDateArray: []
};

// console.log("Account Reducer is called");

// switch cases
export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_EXPIRED_RESET_STORE:
      return Actions.auth({ type: "reset" });
    case SESSION_EXPIRED:
      return { ...state, sessionExpired: true };
    case PROFILE:
      return { ...state, accountsLoading: true };
    case PROFILE_SUCCESS:
      // console.log(action);
      return {
        ...state,
        accountsLoading: false,
        accountsArray: action.payload.accountArray,
        accountArrayLength: action.payload.accountArrayLength,
        AvailableAccStatus: true
      };
    case PROFILE_SUCCESS_AUTO_SELECT:
      return {
        ...state,
        accountsLoading: false,
        accountsArray: action.payload.accountArray,
        accountArrayLength: action.payload.accountArrayLength,
        AvailableAccStatus: true
      };
    case PROFILE_FAIL:
      return { ...state, accountsLoading: false };
    case ACCOUNT_DETAILS_CALL:
      return { ...state, accountDetailsLoading: true };
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        accountDetailsLoading: false,
        accountDetails: action.payload.accountDetails, // this is a object with all details of account
        accountUpgradeDetails: action.payload.accountUpgradeDetails,
        userInfo: {
          username: action.payload.userName,
          address: action.payload.userAddress,
          mobileNo: action.payload.userMobile,
          phoneNo: action.payload.userPhone
        },
        // no need to call receive action, userinfo to show on drawer can be created here.
        selectedAccountInfo: {
          name: action.payload.userName,
          email: action.payload.selectedAccountName
        },
        accountDetailsStatus: true,
        accountDetailsFailed: false,
        showLeftDaysGraphics: true,
        showSpeedGraphics: false
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        accountDetailsLoading: false,
        accountDetailsStatus: false,
        accountDetailsFailed: true
      };
    case CHANGE_TO_SPEED_GRAPHICS:
      return {
        ...state,
        showLeftDaysGraphics: false,
        showSpeedGraphics: true
      };
    case CHANGE_TO_LEFTDAYS_GRAPHICS:
      return {
        ...state,
        showLeftDaysGraphics: true,
        showSpeedGraphics: false
      };
    // case RECEIVED_USERINFO:
    // 	return {
    // 		...state,
    // 		selectedAccountInfo: {
    // 			name: action.payload.name,
    // 			email: action.payload.email
    // 		}
    // 	};

    case GET_USERINFO:
      return {
        ...state
      };
    case GET_INTERNET_USAGE_HISTORY:
      return {
        ...state,
        InternetUsageByYearLoader: true
      };
    case GET_INTERNET_USAGE_HISTORY_SUCCESS:
      console.log("internetUsageByYearArray");
      console.log(action.payload);
      // console.log(_.map(action.payload, "d_yansiyan_download"));
      return {
        ...state,
        internetUsageByYearLoader: false,
        internetUsageByYearStatus: true,
        internetUsageByYearArray: action.payload
        /* internetUsageByYearArray: {
					d_yansiyan_download: _.map(
						action.payload,
						"d_yansiyan_download"
					),
					d_yansiyan_upload: _.map(
						action.payload,
						"d_yansiyan_upload"
					),
					d_month: _.map(action.payload, "d_month")
				} */
      };
    case GET_INTERNET_USAGE_HISTORY_FAIL:
      return {
        ...state,
        internetUsageByYearLoader: false,
        internetUsageByYearStatus: false,
        internetUsageByYearArray: []
      };
    case GET_INTERNET_USAGE_HISTORY_FINISHED:
      return {
        ...state,
        internetUsageByYearLoader: false
      };
    case GET_INTERNET_USAGE_BY_DATE:
      return {
        ...state,
        internetUsageByDateLoader: true
      };
    case GET_INTERNET_USAGE_BY_DATE_SUCCESS:
      return {
        ...state,
        internetUsageByDateLoader: false,
        internetUsageByDateStatus: true,
        internetUsageByDateArray: action.payload
      };
    case GET_INTERNET_USAGE_BY_DATE_FAIL:
      return {
        ...state,
        internetUsageByDateLoader: false,
        internetUsageByDateStatus: false,
        internetUsageByDateArray: []
      };
    case GET_INTERNET_USAGE_BY_DATE_FINISHED:
      return {
        ...state,
        internetUsageByDateLoader: false
      };
    default:
      return state;
  }
};
