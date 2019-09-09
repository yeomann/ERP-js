import { SESSION_EXPIRED_RESET_STORE } from "./types.js";
// import { LoadKeyChain, GetKeyChainSessionID } from "../util/keychain";
// import { API_BASE_URL, CHECK_SESSION_ENDPOINT, ApiUtils } from "../api";
import { getSession } from "../utils/loginValidator";

/*
 * @desc return session obj
 */
export const getsessionPostObj = async () => {
  try {
    return {
      access_token: await getSession()
    };
  } catch (error) {
    return error;
  }
};

/**
 *  @summary Call For Resetting store
 *  $helperFunction
 */
export const SessionExpireResetStore = () => dispatch => {
  dispatch({ type: SESSION_EXPIRED_RESET_STORE });
};
