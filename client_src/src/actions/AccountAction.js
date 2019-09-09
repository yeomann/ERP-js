import {
  SESSION_CHECK_START,
  SESSION_IS_VALID,
  SESSION_EXPIRED,
  PROFILE,
  PROFILE_SUCCESS,
  // PROFILE_SUCCESS_AUTO_SELECT,
  PROFILE_FAIL,
  PROFILE_FINISHED,
  ACCOUNT_DETAILS_CALL,
  ACCOUNT_DETAILS_CALL_FINISHED,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  CHANGE_TO_SPEED_GRAPHICS,
  CHANGE_TO_LEFTDAYS_GRAPHICS,
  GET_INTERNET_USAGE_HISTORY,
  GET_INTERNET_USAGE_HISTORY_SUCCESS,
  GET_INTERNET_USAGE_HISTORY_FAIL,
  GET_INTERNET_USAGE_HISTORY_FINISHED,
  GET_INTERNET_USAGE_BY_DATE,
  GET_INTERNET_USAGE_BY_DATE_SUCCESS,
  GET_INTERNET_USAGE_BY_DATE_FAIL,
  GET_INTERNET_USAGE_BY_DATE_FINISHED,
  // RECEIVED_USERINFO,
  GET_USERINFO
} from "./types";
import {
  API_BASE_URL,
  GET_CUSTOMER,
  GET_CUSTOMER_DETAILS,
  GET_INTERNET_USAGE_HISTORY_ENDPOINT,
  GET_INTERNET_USAGE_BY_DATE_ENDPOINT,
  ApiUtils
} from "../static/api";
// essential Session Check functions
import {
  remoteValidateSessionID,
  handleRemoteValidateResponse,
  getSessionFromKeychain
} from "./commonAction.js";

/**
 * @desc  Old function for Selecting Profile, changing because of new Function provided to check Session
 */
export const SelectProfileCallV2 = () => async dispatch => {
  console.log(`SelectProfileCallV2 is being called`);
  dispatch({ type: PROFILE });
  // const selectProfileCallFinished = null;

  const KeyChainSessionStr = await getSessionFromKeychain();
  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  if (ValidateResponse) {
    handleRemoteValidateResponse(ValidateResponse);
    /* selectProfileCallFinished = await dispatch(
			TestAccountProfiles("949269eeaceab122ed8f5d9202da2bb6")
		); */
    await dispatch(GetAccountProfiles(KeyChainSessionStr)).then(
      status => {
        console.log(status);
        dispatch({ type: PROFILE_FINISHED });
        return true;
      },
      error => {
        console.log(error);
        dispatch({ type: "PROFILE_FINISHED_WITH_ERROR" });
        return false;
      }
    );
  } else {
    return false;
  }
};
/**
 * @desc  Make request to get All Profile related to account
 * @usingAt {SelectProfileCallV2}
 */
export const GetAccountProfiles = inComingSessionID => dispatch =>
  new Promise((resolve, reject) => {
    console.log(`calling fetch API ${API_BASE_URL}${GET_CUSTOMER} with ${inComingSessionID}`);
    const PostDataString = `session_id=${inComingSessionID}&b_debug=1`;
    return fetch(`${API_BASE_URL}${GET_CUSTOMER}`, {
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
        console.log(
          `Response of PROFILECALL= ${response.a_data.a_accounts} and COUNT ${
            Object.keys(response.a_data.a_accounts).length
          }`
        );
        if (Number(response.i_result) === 1) {
          const AccountsArray = response.a_data.a_accounts;
          const AccountsArrayLength = Object.keys(response.a_data.a_accounts).length;
          dispatch({
            type: PROFILE_SUCCESS,
            payload: {
              accountArray: AccountsArray,
              accountArrayLength: AccountsArrayLength
            }
          });
          resolve(AccountsArray);
          return true;
        }
        // console.log(response);
        dispatch({ type: PROFILE_FAIL });
        resolve(response);
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: PROFILE_FAIL });
        reject(error);
        return false;
      });
  });

/**
 *   Make Test Profile request
 */
export const TestAccountProfiles = inComingSessionID => dispatch =>
  new Promise((resolve, reject) => {
    console.log(`calling next fetch API ${API_BASE_URL}${GET_CUSTOMER}`);
    const PostDataString = `session_id=${inComingSessionID}&b_debug=1`;
    if (PostDataString) {
      dispatch({
        type: "PROFILE_SUCCESS_TEST"
      });
      resolve(true);
    } else {
      dispatch({ type: "PROFILE_FAIL_TEST" });
      reject(false);
    }
  });
/**
 * @desc  Orchestrating Call For getting Selected Account Details
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the AccountDetailsCall()
 *  @see AccountDetailsCall
 * @return {Promise<Resolve, Reject>}
 */
export const AccountDetailsCallV2 = selectedAccount => async dispatch => {
  console.log(`AccountDetailsCallV2 is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  console.log("%c Purple", "background:purple;color:white");
  console.log(KeyChainSessionStr);

  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  console.log("%c Purple", "background:purple;color:white");
  console.log(ValidateResponse);

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });
    dispatch({ type: ACCOUNT_DETAILS_CALL });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(AccountDetailsCall(KeyChainSessionStr, selectedAccount)).then(
      status => {
        console.log(status);
        dispatch({ type: ACCOUNT_DETAILS_CALL_FINISHED });
      },
      error => {
        console.log(error);
        dispatch({ type: "ACCOUNT_DETAILS_CALL_FINISHED_WITH_ERROR" });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};
/**
 *  @desc Call For getting Selected Account Details
 *  @useAt {AccountDetailsCallV2()}
 * @return {Promise<Resolve, Reject>}
 */
export const AccountDetailsCall = (sessionID, selectedAccount) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(`calling fetch API ${API_BASE_URL}${GET_CUSTOMER_DETAILS}`);
    const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&b_debug=1`;
    return fetch(`${API_BASE_URL}${GET_CUSTOMER_DETAILS}`, {
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
        console.log(`Response AccountDetailsCall= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          dispatch({
            type: ACCOUNT_DETAILS_SUCCESS,
            payload: {
              accountDetails: response.a_data.a_account_details.a_internet_service_details,
              accountUpgradeDetails:
                response.a_data.a_account_details.a_upgrade_internet_service_details,
              userName: response.a_data.a_account_details.s_firstname_sirname,
              selectedAccountName: response.a_data.a_account_details.s_username,
              userAddress: response.a_data.a_account_details.s_address,
              userMobile: response.a_data.a_account_details.s_mobile,
              userPhone: response.a_data.a_account_details.s_phone
            }
          });
          resolve(response);
          return true;
        }
        reject(response);
        dispatch({ type: ACCOUNT_DETAILS_FAIL });
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: ACCOUNT_DETAILS_FAIL });
        return false;
      });
  });

/**
 *  @summary Call For getting package speed related array
 *  $helperFunction
 */
export const changeToSpeedGraphics = () => dispatch => {
  dispatch({ type: CHANGE_TO_SPEED_GRAPHICS });
};
/**
 *  @summary Call For getting package Left days related array
 *  $helperFunction
 */
export const changeToLeftDaysGraphics = () => dispatch => {
  dispatch({ type: CHANGE_TO_LEFTDAYS_GRAPHICS });
};

/**
 *  @summary Call For getting User info such as Username and email and more
 *  @see {AccountDetailsCallV2()}
 *  $helperFunction
 */
export const getUserInfo = () => dispatch => {
  dispatch({ type: GET_USERINFO });
};

/**
 * @desc  Orchestrating Call For Internet usage history for current year
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the AccountDetailsCall()
 *  @see AccountDetailsCall
 * @return {Promise<Resolve, Reject>}
 */
export const InternetUsageHistoryByYearCall = (selectedAccount, type, year) => async dispatch => {
  console.log(`InternetUsageHistoryCallV2 is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  console.log("%c Purple", "background:purple;color:white");
  console.log(KeyChainSessionStr);

  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  console.log("%c Purple", "background:purple;color:white");
  console.log(ValidateResponse);

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });
    dispatch({ type: GET_INTERNET_USAGE_HISTORY });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(
      InternetUsageHistoryByYear(KeyChainSessionStr, selectedAccount, type, year)
    ).then(
      status => {
        console.log(status);
        dispatch({ type: GET_INTERNET_USAGE_HISTORY_FINISHED });
      },
      error => {
        console.log(error);
        dispatch({
          type: "GET_INTERNET_USAGE_HISTORY_FINISHED_WITH_ERROR"
        });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};
/**
 *  @desc Call For getting Selected Account Download and upload history by give year
 *  @useAt {InternetUsageHistoryByYearCall()}
 * @return {Promise<Resolve{ofArray}, Reject>}
 */
export const InternetUsageHistoryByYear = (sessionID, selectedAccount, type, year) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(
      `calling fetch API ${API_BASE_URL}${GET_INTERNET_USAGE_HISTORY_ENDPOINT} with selectedAccount=${selectedAccount}type=${type}year=${year}`
    );
    const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&i_type=${type}&i_year=${year}&b_debug=1`;
    return fetch(`${API_BASE_URL}${GET_INTERNET_USAGE_HISTORY_ENDPOINT}`, {
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
        console.log(`Response InternetUsageHistoryByYear= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          dispatch({
            type: GET_INTERNET_USAGE_HISTORY_SUCCESS,
            payload: response.a_data.a_usages
          });
          resolve(response);
          return true;
        }
        reject(response);
        dispatch({ type: GET_INTERNET_USAGE_HISTORY_FAIL });
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: GET_INTERNET_USAGE_HISTORY_FAIL });
        return false;
      });
  });

/**
 * @desc  Orchestrating Call For Internet usage history of TODAY
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the AccountDetailsCall()
 *  @see AccountDetailsCall
 * @return {Promise<Resolve, Reject>}
 */
export const InternetUsageByDateCall = (selectedAccount, type, date) => async dispatch => {
  console.log(`InternetUsageHistoryCallV2 is being called`);
  dispatch({ type: SESSION_CHECK_START });

  const KeyChainSessionStr = await getSessionFromKeychain();
  console.log("%c Purple", "background:purple;color:white");
  console.log(KeyChainSessionStr);

  const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

  console.log("%c Purple", "background:purple;color:white");
  console.log(ValidateResponse);

  if (ValidateResponse) {
    dispatch({ type: SESSION_IS_VALID });

    dispatch({ type: GET_INTERNET_USAGE_BY_DATE });
    handleRemoteValidateResponse(ValidateResponse);
    await dispatch(InternetUsageByDate(KeyChainSessionStr, selectedAccount, type, date)).then(
      status => {
        console.log(status);
        dispatch({ type: GET_INTERNET_USAGE_BY_DATE_FINISHED });
      },
      error => {
        console.log(error);
        dispatch({
          type: "GET_INTERNET_USAGE_BY_DATE_FINISHED_WITH_ERROR"
        });
      }
    );
  } else {
    dispatch({ type: SESSION_EXPIRED });
  }
};

/**
 *  @desc Call For getting Selected Account Download and upload history by give year
 *  @useAt {InternetUsageByDateCall()}
 * @return {Promise<Resolve{ofArray}, Reject>}
 */
export const InternetUsageByDate = (sessionID, selectedAccount, type, date) => dispatch =>
  new Promise((resolve, reject) => {
    // request is about to start
    console.log(
      `calling fetch API ${API_BASE_URL}${GET_INTERNET_USAGE_BY_DATE_ENDPOINT} with selectedAccount=${selectedAccount}type=${type}s_date=${date}`
    );
    const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&i_type=${type}&s_date=${date}&b_debug=1`;
    return fetch(`${API_BASE_URL}${GET_INTERNET_USAGE_BY_DATE_ENDPOINT}`, {
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
        console.log(`Response InternetUsageByDate= ${JSON.stringify(response)}`);
        if (Number(response.i_result) === 1) {
          dispatch({
            type: GET_INTERNET_USAGE_BY_DATE_SUCCESS,
            payload: response.a_data.a_usages_data.a_usages
          });
          resolve(response);
          return true;
        }
        reject(response);
        dispatch({ type: GET_INTERNET_USAGE_BY_DATE_FAIL });
        return false;
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: GET_INTERNET_USAGE_BY_DATE_FAIL });
        return false;
      });
  });
