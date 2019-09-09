export default {
  CHANGE: "CHANGE",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR"
};

export const GET_SIDEBAR_ITEMS = "get_sidebar_items";
/*
 * ##############################
 *  AUTH
 * ##############################
 */
export const LOGIN_USER_SUBMIT = "login_user_submit";
export const GET_SESSION_ID = "get_session_id";
export const LOGIN_USER_SUCCESS = "login_user_success";
export const LOGIN_USER_FAIL = "login_user_fail";

/*
 * ##############################
 *  Customers
 * ##############################
 */
// Get Customers
export const GET_CUSTOMERS = "get_customers";
export const GET_CUSTOMERS_SUCCESS = "get_customers_success";
export const GET_CUSTOMERS_FAIL = "get_customers_fail";
// Delete Customer
export const DELETE_CUSTOMER = "delete_category";
export const DELETE_CUSTOMER_SUCCESS = "delete_category_success";
export const DELETE_CUSTOMER_FAIL = "delete_category_fail";
/*
 * ##############################
 *  Orders
 * ##############################
 */
// Get Orders
export const GET_ORDERS = "get_Orders";
export const GET_ORDERS_SUCCESS = "get_Orders_success";
export const GET_ORDERS_FAIL = "get_Orders_fail";
// get order details
export const GET_ORDER_DETAILS = "get_Order_details";
export const GET_ORDER_DETAILS_SUCCESS = "get_Order_details_success";
export const GET_ORDER_DETAILS_FAIL = "get_Order_details_fail";
// Delete Order
export const DELETE_ORDER = "delete_order";
export const DELETE_ORDER_SUCCESS = "delete_order_success";
export const DELETE_ORDER_FAIL = "delete_order_fail";
/*
 * ##############################
 *  Categories
 * ##############################
 */
// Get Categories
export const GET_CATEGORIES = "get_categories";
export const GET_CATEGORIES_SUCCESS = "get_categories_success";
export const GET_CATEGORIES_FAIL = "get_categories_fail";
// get Single category
export const GET_SINGLE_CATEGORY = "get_single_category";
export const GET_SINGLE_CATEGORY_SUCCESS = "get_single_category_success";
export const GET_SINGLE_CATEGORY_FAIL = "get_single_category_fail";
// Delete Category
export const DELETE_CATEGORY = "delete_category";
export const DELETE_CATEGORY_SUCCESS = "delete_category_success";
export const DELETE_CATEGORY_FAIL = "delete_category_fail";
// Edit Category
export const EDIT_CATEGORY = "edit_category";
export const EDIT_CATEGORY_SUCCESS = "edit_category_success";
export const EDIT_CATEGORY_FAIL = "edit_category_fail";
// Set Categories
export const SET_CATEGORY = "add_new_category";
export const SET_CATEGORY_SUCCESS = "add_new_category_success";
export const SET_CATEGORY_FAIL = "add_new_category_fail";
/*
 * ##############################
 *  Cities
 * ##############################
 */
// Get Cities
export const GET_CITIES = "get_cities";
export const GET_CITIES_SUCCESS = "get_cities_success";
export const GET_CITIES_FAIL = "get_cities_fail";
// Set city
export const SET_CITY = "add_new_city";
export const SET_CITY_SUCCESS = "add_new_city_success";
export const SET_CITY_FAIL = "add_new_city_fail";
// Get Cities Regions
export const GET_CITIES_REGIONS = "get_city_regions";
export const GET_CITIES_REGIONS_SUCCESS = "get_city_regions_success";
export const GET_CITIES_REGIONS_FAIL = "get_city_regions_fail";
// get Single category
// export const GET_SINGLE_CATEGORY = "get_single_category";
// export const GET_SINGLE_CATEGORY_SUCCESS = "get_single_category_success";
// export const GET_SINGLE_CATEGORY_FAIL = "get_single_category_fail";
// Delete Category
export const DELETE_CITY = "delete_cities";
export const DELETE_CITY_SUCCESS = "delete_cities_success";
export const DELETE_CITY_FAIL = "delete_cities_fail";
// Edit Region
export const EDIT_CITY = "edit_city";
export const EDIT_CITY_SUCCESS = "edit_city_success";
export const EDIT_CITY_FAIL = "edit_city_fail";
/*
 * ##############################
 *  Regions
 * ##############################
 */
// Get Regions
export const GET_REGIONS = "get_regions";
export const GET_REGIONS_SUCCESS = "get_regions_success";
export const GET_REGIONS_FAIL = "get_regions_fail";
// get Single Region
export const GET_SINGLE_REGIONS = "get_single_REGIONS";
export const GET_SINGLE_REGIONS_SUCCESS = "get_single_REGIONS_success";
export const GET_SINGLE_REGIONS_FAIL = "get_single_REGIONS_fail";
// set region
export const SET_REGION = "add_new_region";
export const SET_REGION_SUCCESS = "add_new_region_success";
export const SET_REGION_FAIL = "add_new_region_fail";
// Delete Region
export const DELETE_REGION = "delete_region";
export const DELETE_REGION_SUCCESS = "delete_region_success";
export const DELETE_REGION_FAIL = "delete_region_fail";
// Edit Region
export const EDIT_REGION = "edit_region";
export const EDIT_REGION_SUCCESS = "edit_region_success";
export const EDIT_REGION_FAIL = "edit_region_fail";

/*
 * ##############################
 *  Restaurant
 * ##############################
 */
// Get Categories
export const GET_RESTAURANTS = "get_restaurants";
export const GET_RESTAURANTS_SUCCESS = "get_restaurants_success";
export const GET_RESTAURANTS_FAIL = "get_restaurants_fail";
// rest credentials get and set
export const GET_RESTAURANT_CREDENTIALL = "get_restaurant_credentiall";
export const GET_RESTAURANT_CREDENTIALS_SUCCES = "get_restaurant_credentials_succes";
export const GET_RESTAURANT_CREDENTIALS_FAIL = "get_restaurant_credentials_fail";
export const CREATE_RESTAURANT_CREDENTIAL = "create_restaurant_credential";
export const CREATE_RESTAURANT_CREDENTIALS_SUCCES = "create_restaurant_credentials_succes";
export const CREATE_RESTAURANT_CREDENTIALS_FAIL = "create_restaurant_credentials_fail";
export const CREATE_RESTAURANT_CREDENTIAL_LIVE = "create_restaurant_credential_live";
export const CREATE_RESTAURANT_CREDENTIALS_SUCCES_LIVE =
  "create_restaurant_credentials_succes_live";
export const CREATE_RESTAURANT_CREDENTIALS_FAIL_LIVE = "create_restaurant_credentials_fail_live";
// telegram bot settings
export const GET_TELEGRAM_BOT_SETTINGS = "get_telegram_bot_settings";
export const GET_TELEGRAM_BOT_SETTINGS_SUCCESS = "get_telegram_bot_settings_success";
export const GET_TELEGRAM_BOT_SETTINGS_FAIL = "get_telegram_bot_settings_fail";
export const CREATE_TELEGRAM_BOT_SETTINGS = "create_telegram_bot_settings";
export const CREATE_TELEGRAM_BOT_SETTINGS_SUCCESS = "create_telegram_bot_settings_success";
export const CREATE_TELEGRAM_BOT_SETTINGS_FAIL = "create_telegram_bot_settings_fail";
// get Single category
export const GET_SINGLE_RESTAURANT = "get_single_restarant";
export const GET_SINGLE_RESTAURANT_SUCCESS = "get_single_restarant_success";
export const GET_SINGLE_RESTAURANT_FAIL = "get_single_restarant_fail";

// Delete Category
export const DELETE_RESTAURANT = "delete_restaurant";
export const DELETE_RESTAURANT_SUCCESS = "delete_restaurant_success";
export const DELETE_RESTAURANT_FAIL = "delete_restaurant_fail";

// Set Restaurant
export const SET_RESTAURANT = "add_new_restaurant";
export const SET_RESTAURANT_SUCCESS = "add_new_restaurant_success";
export const SET_RESTAURANT_FAIL = "add_new_restaurant_fail";
// Edit Restaurant
export const EDIT_SINGLE_RESTAURANT = "edit_single_restaurant";
export const EDIT_SINGLE_RESTAURANT_SUCCESS = "edit_single_restaurant_success";
export const EDIT_SINGLE_RESTAURANT_FAIL = "edit_single_restaurant_fail";

// init app
// session
export const SESSION_CHECK_START = "session_check_started";
export const SESSION_IS_VALID = "session_is_valid";
export const SESSION_EXPIRED = "session_expired";
export const SESSION_EXPIRED_RESET_STORE = "session_expired_reset_store";

//language
export const APP_DEVICE_LANG_DETECT = "app_device_lang_detect";
export const APP_DEVICE_LANG_DETECT_SUCCESS = "app_device_lang_detect_success";
export const APP_DEVICE_LANG_DETECT_FAIL = "app_device_lang_detect_fail";
export const APP_DEVICE_LANG_DETECT_FINISHED = "app_device_lang_detect_finished";
export const APP_SET_LANGUAGE = "app_set_language";

// Step 1
export const APP_INIT_VALIDATOR_STARTED = "app_INIT_validator_started";
export const APP_INIT_VALIDATOR_FINISHED = "app_INIT_validator_finished";
export const APP_IS_NOT_RUNNING_FIRST_TIME = "app_is_not_running_first_time";
export const APP_IS_RUNNING_FIRST_TIME = "app_is_running_first_time";
// setting app first time
export const SET_APP_FIRST_TIME_START = "set_app_first_time_started";
export const SET_APP_FIRST_TIME_SUCCESS = "set_app_first_time_success";
export const SET_APP_FIRST_TIME_FAIL = "set_app_first_time_fail";
export const SET_APP_FIRST_TIME_FINISHED = "set_app_first_time_finished";

// not using skip anymore
export const APP_CHECKING_INTRO_SKIP_TRUE = "app_check_intro_skip_true";
export const APP_CHECKING_INTRO_SKIP_FALSE = "app_check_intro_skip_false";
// Step 2
export const APP_SESSION_VALIDATOR_STARTED = "APP_SESSION_VALIDATOR_started";
export const APP_SESSION_VALIDATOR_FINISHED = "APP_SESSION_VALIDATOR_finished";
export const APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR =
  "APP_SESSION_VALIDATOR_finished_WITH_ERROR";
export const APP_SESSION_VALIDATOR_LOADER_RESET = "APP_SESSION_VALIDATOR_loader_reset";

export const APP_SESSION_VALIDATOR_SUCCESS = "app_session_validator_success";
export const APP_SESSION_VALIDATOR_FAILED = "app_session_validator_failed";

export const APP_DOES_NOT_HAS_LOGIN_CREDENTIALS = "app_does_not_has_login_credentials";
export const APP_HAS_LOGIN_CREDENTIALS = "app_has_login_credentials";
export const APP_LOADING = "app_loading";
export const REFRESHING_SESSION_ID_STARTED = "refreshing_session_id_started";
export const REFRESHING_SESSION_ID_SUCCESS = "refreshing_session_id_success";
export const REFRESHING_SESSION_ID_FAILED = "refreshing_session_id_failed";
export const REFRESHING_SESSION_ID_COMPLETED = "refreshing_session_id_completed";

// export const APP_
// introLoading: true,
// skipStatus: false,
// hasToken: false,
// loginLoading: false,
// refreshingSessionStatus: false

// auth related
export const RESET_AUTH_ERROR = "rest_auth_errors";
export const ACCOUNTID_CHANGED = "accountid_changed";
export const PASSWORD_CHANGED = "password_changed";
// export const REFRESHING_SESSION_ID = "refreshing_session_id";
// export const REFRESHING_SESSION_ID_COMPLETED =
// 	"refreshing_session_id_completed";
export const GET_SESSION_ID_BY_KEYCHAIN = "get_session_id_by_keychain";
// Session Check
export const REMOTE_VERIFY_SESSION_START = "remote_verify_session_start";
export const REMOTE_VERIFY_SESSION_STRING_DOES_NOT_EXISTS =
  "remote_verify_session_string_does_not_exists";
export const REMOTE_VERIFY_SESSION_STRING_EXISTS = "remote_verify_session_string_exists";
export const REMOTE_VERIFY_SESSION_SUCCESS = "remote_verify_session_success";
export const REMOTE_VERIFY_SESSION_FAIL = "remote_verify_session_fail";
export const REMOTE_VERIFY_SESSION_FINISHED = "remote_verify_session_finished";

// Billing info
export const GET_BILLING_HISTORY = "get_billing_history_started";
export const GET_BILLING_HISTORY_SUCCESS = "get_billing_history_success";
export const GET_BILLING_HISTORY_FAIL = "get_billing_history_fail";
export const GET_BILLING_HISTORY_FINISHED = "get_billing_history_finished";

//HELP aka FAQ
export const GET_FAQ = "get_faq";
export const GET_FAQ_SUCCESS = "get_faq_success";
export const GET_FAQ_FAIL = "get_faq_fail";

//Forget password
export const FORGET_PASSWORD_ACCOUNTID = "forgot_password_accountID";
export const GET_FORGET_PASS = "get_forget_pass";
export const GET_FORGET_PASS_SUCCESS = "get_forget_pass_success";
export const GET_FORGET_PASS_FAIL = "get_forget_pass_fail";

// Privacy policy
export const GET_PRIVACY_POLICY = "privacy_policy_started";
export const GET_PRIVACY_POLICY_SUCCESS = "privacy_policy_success";
export const GET_PRIVACY_POLICY_FAIL = "privacy_policy_fail";
export const GET_PRIVACY_POLICY_FINISHED = "privacy_policy_finished";

// about nethouse
export const GET_ABOUT = "get_about_started";
export const GET_ABOUT_SUCCESS = "get_about_success";
export const GET_ABOUT_FAIL = "get_about_fail";
export const GET_ABOUT_FINISHED = "get_about_failed";

// campaigns
export const GET_CAMPAIGNS = "get_campaigns";
export const GET_CAMPAIGNS_SUCCESS = "get_campaigns_success";
export const GET_CAMPAIGNS_FAIL = "get_campaigns_fail";

export const GET_INTERNET_USAGE_BY_DATE_FINISHED = "get_internet_usage_by_date_finished";

// update push notification token
export const UPDATE_PUSH_NOTIFICATION_TOKEN = "update_push_notification_token_start";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS = "update_push_notification_token_success";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL = "update_push_notification_token_fail";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_FINISHED = "update_push_notification_token_finished";
// set and get push notification remote permission
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION =
  "set_push_notification_token_remote_permission_start";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS =
  "set_push_notification_token_remote_permission_success";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL =
  "set_push_notification_token_remote_permission_fail";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED =
  "set_push_notification_token_remote_permission_finished";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION =
  "get_push_notification_token_remote_permission_start";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS =
  "get_push_notification_token_remote_permission_success";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL =
  "get_push_notification_token_remote_permission_fail";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED =
  "get_push_notification_token_remote_permission_finished";

// logout
export const LOGOUT_CLEARSTORE = "LOGOUT_CLEARSTORE";
