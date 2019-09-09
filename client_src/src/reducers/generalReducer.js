// types
import {
  GET_SIDEBAR_ITEMS,
  // get customers
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  // delete customer
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  // get category
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  // get Single Cat
  GET_SINGLE_CATEGORY,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  // set category
  SET_CATEGORY,
  SET_CATEGORY_SUCCESS,
  SET_CATEGORY_FAIL,
  // delete category
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  // edit category
  // EDIT_CATEGORY,
  // EDIT_CATEGORY_SUCCESS,
  // EDIT_CATEGORY_FAIL
  // restaurants
  // get
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
  // restaurant credentials
  GET_RESTAURANT_CREDENTIALL,
  GET_RESTAURANT_CREDENTIALS_SUCCES,
  GET_RESTAURANT_CREDENTIALS_FAIL,
  CREATE_RESTAURANT_CREDENTIAL,
  CREATE_RESTAURANT_CREDENTIALS_SUCCES,
  CREATE_RESTAURANT_CREDENTIALS_FAIL,
  CREATE_RESTAURANT_CREDENTIAL_LIVE,
  CREATE_RESTAURANT_CREDENTIALS_SUCCES_LIVE,
  CREATE_RESTAURANT_CREDENTIALS_FAIL_LIVE,
  // telegram bot settings
  GET_TELEGRAM_BOT_SETTINGS,
  GET_TELEGRAM_BOT_SETTINGS_SUCCESS,
  GET_TELEGRAM_BOT_SETTINGS_FAIL,
  // create
  SET_RESTAURANT,
  SET_RESTAURANT_SUCCESS,
  SET_RESTAURANT_FAIL,
  // get Single Restaurant
  GET_SINGLE_RESTAURANT,
  GET_SINGLE_RESTAURANT_SUCCESS,
  GET_SINGLE_RESTAURANT_FAIL,
  // edit
  EDIT_SINGLE_RESTAURANT,
  EDIT_SINGLE_RESTAURANT_SUCCESS,
  EDIT_SINGLE_RESTAURANT_FAIL,
  // delete
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAIL,
  // get cities
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  // set/ create new city // Recalling get cities in action, so no need :)
  // SET_CITY,
  // SET_CITY_SUCCESS,
  // SET_CITY_FAIL,
  // get cities with regions
  GET_CITIES_REGIONS,
  GET_CITIES_REGIONS_SUCCESS,
  GET_CITIES_REGIONS_FAIL,
  // delete city
  DELETE_CITY,
  DELETE_CITY_SUCCESS,
  DELETE_CITY_FAIL,
  // get regions
  GET_REGIONS,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAIL
  // SESSION_EXPIRED_RESET_STORE
} from "./../actions/types";
import staticSidebarNavItems from "../data/sidebar-nav-items";

// initial states
const initialState = {
  // get customers
  customerLoader: false,
  customers: [],
  customersCount: 0,
  // delete customer
  deleteCustomerLoader: false,
  deleteCustomerStatus: false,
  // get categories
  catLoader: false,
  categories: [],
  // single cate
  catSingleLoader: false,
  categorySingle: "",
  // set category
  addNewCatLoaded: false,
  addNewCategoryStatus: false,
  // delete category
  deleteCatLoader: false,
  deleteCategoryStatus: false,
  // edit category
  editCatLoader: false,
  editCategoryStatus: false,
  // get restaurants
  restLoader: false,
  restaurants: [],
  restaurantsCount: 0,
  // rest credentials
  restCredentialsLoader: false,
  restCredentials: [],
  createCredentialsLoader: false,
  createCredentialsStatus: false,
  // telegram bot settings
  telegramBotSettingsLoader: false,
  telegramBotSettings: [],
  // get single restaurant
  restSingleLoader: false,
  restaurantSingle: {},
  // edit single restaurant
  updatingRestaurantLoader: null,
  // delete restaurant
  deleteRestLoader: false,
  deleteRestegoryStatus: false,
  // get cities
  citiesLoader: false,
  cities: [],
  // get cities with regions
  citiesNRegionsLoader: false,
  citiesNRegions: [],
  // delete city
  deleteCityLoader: false,
  deleteCityStatus: false,
  // get regions
  regionsLoader: false,
  regions: [],
  // sidebar
  sidebarItems: staticSidebarNavItems()
};

// console.log("General Reducer is called");

// switch cases
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SIDEBAR_ITEMS:
      return { ...state, sidebarItems: staticSidebarNavItems() };
    // get customers
    case GET_CUSTOMERS:
      return { ...state, customerLoader: true };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customerLoader: false,
        customers: action.payload,
        customersCount: action.payload.length
      };
    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        customerLoader: false,
        customersCount: 0
      };
    case DELETE_CUSTOMER:
      return { ...state, deleteCustomerLoader: true };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        deleteCustomerLoader: false,
        deleteCustomerStatus: true
      };
    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        deleteCustomerLoader: false,
        deleteCustomerStatus: false
      };
    // get categories
    case GET_CATEGORIES:
      return { ...state, catLoader: true };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        catLoader: false,
        categories: action.payload
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        catLoader: false
      };
    // get single category
    case GET_SINGLE_CATEGORY:
      return { ...state, catSingleLoader: true };
    case GET_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        catSingleLoader: false,
        categorySingle: action.payload
      };
    case GET_SINGLE_CATEGORY_FAIL:
      return {
        ...state,
        catSingleLoader: false
      };
    // Set (add new) category
    case SET_CATEGORY:
      return { ...state, addNewCatLoaded: true };
    case SET_CATEGORY_SUCCESS:
      return {
        ...state,
        addNewCatLoaded: false,
        addNewCategoryStatus: true
        // deleteCategoryStatus: false // before new fetching this must be false
      };
    case SET_CATEGORY_FAIL:
      return {
        ...state,
        addNewCatLoaded: false
      };
    case DELETE_CATEGORY:
      return { ...state, deleteCatLoader: true };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCatLoader: false,
        deleteCategoryStatus: true
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        deleteCatLoader: false,
        deleteCategoryStatus: false
      };
    // case EDIT_CATEGORY:
    //   return { ...state, editCatLoader: true };
    // case EDIT_CATEGORY_SUCCESS:
    //   return {
    //     ...state,
    //     editCatLoader: false,
    //     editCategoryStatus: true
    //   };
    // case EDIT_CATEGORY_FAIL:
    //   return {
    //     ...state,
    //     editCatLoader: false,
    //     editCategoryStatus: false
    //   };
    case GET_SINGLE_RESTAURANT:
      return { ...state, restSingleLoader: true };
    case GET_SINGLE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restSingleLoader: false,
        restaurantSingle: action.payload
      };
    case GET_SINGLE_RESTAURANT_FAIL:
      return {
        ...state,
        restSingleLoader: false,
        // for reset purpose make single array empty
        restaurantSingle: {}
      };
    case EDIT_SINGLE_RESTAURANT:
      return {
        ...state,
        updatingRestaurantLoader: true
      };
    case EDIT_SINGLE_RESTAURANT_SUCCESS:
      return {
        ...state,
        updatingRestaurantLoader: false
      };
    case EDIT_SINGLE_RESTAURANT_FAIL:
      return {
        ...state,
        updatingRestaurantLoader: false
      };
    case GET_RESTAURANTS:
      return { ...state, restLoader: true };
    case GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restLoader: false,
        restaurants: action.payload,
        restaurantsCount: action.payload.length
      };
    case GET_RESTAURANTS_FAIL:
      return {
        ...state,
        restLoader: false,
        restaurantsCount: 0
      };
    // restaurant credentials
    case GET_RESTAURANT_CREDENTIALL:
      return { ...state, restCredentialsLoader: true };
    case GET_RESTAURANT_CREDENTIALS_SUCCES:
      return { ...state, restCredentialsLoader: false, restCredentials: action.payload };
    case GET_RESTAURANT_CREDENTIALS_FAIL:
      return { ...state, restCredentialsLoader: false };
    // create res credentials
    case CREATE_RESTAURANT_CREDENTIAL:
      return { ...state, createCredentialsLoader: true };
    case CREATE_RESTAURANT_CREDENTIALS_SUCCES:
      return { ...state, createCredentialsLoader: false, createCredentialsStatus: true };
    case CREATE_RESTAURANT_CREDENTIALS_FAIL:
      return { ...state, createCredentialsLoader: false };
    case CREATE_RESTAURANT_CREDENTIAL_LIVE:
      return { ...state, createCredentialsLoader: true };
    case CREATE_RESTAURANT_CREDENTIALS_SUCCES_LIVE:
      return { ...state, createCredentialsLoader: false, createCredentialsStatus: true };
    case CREATE_RESTAURANT_CREDENTIALS_FAIL_LIVE:
      return { ...state, createCredentialsLoader: false };

    // GET telegram bot settings
    case GET_TELEGRAM_BOT_SETTINGS:
      return { ...state, telegramBotSettingsLoader: true };
    case GET_TELEGRAM_BOT_SETTINGS_SUCCESS:
      return { ...state, telegramBotSettingsLoader: false, telegramBotSettings: action.payload };
    case GET_TELEGRAM_BOT_SETTINGS_FAIL:
      return { ...state, telegramBotSettingsLoader: false };

    case SET_RESTAURANT:
      return { ...state, addNewRestLoaded: true };
    case SET_RESTAURANT_SUCCESS:
      return {
        ...state,
        addNewRestLoaded: false,
        addNewRestaurantStatus: true
        // deleteCategoryStatus: false // before new fetching this must be false
      };
    case SET_RESTAURANT_FAIL:
      return {
        ...state,
        addNewRestLoaded: false
      };
    case DELETE_RESTAURANT:
      return { ...state, deleteRestLoader: true };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        deleteRestLoader: false,
        deleteRestegoryStatus: true
      };
    case DELETE_RESTAURANT_FAIL:
      return {
        ...state,
        deleteRestLoader: false,
        deleteRestegoryStatus: false
      };
    // get city
    case GET_CITIES:
      return { ...state, citiesLoader: true };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        citiesLoader: false,
        cities: action.payload
      };
    case GET_CITIES_FAIL:
      return {
        ...state,
        citiesLoader: false
      };
    // get city with regions
    case GET_CITIES_REGIONS:
      return { ...state, citiesNRegionsLoader: true };
    case GET_CITIES_REGIONS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        citiesNRegionsLoader: false,
        citiesNRegions: action.payload
      };
    case GET_CITIES_REGIONS_FAIL:
      return {
        ...state,
        citiesNRegionsLoader: false
      };
    // delete ctiy
    case DELETE_CITY:
      return { ...state, deleteCityLoader: true };
    case DELETE_CITY_SUCCESS:
      return {
        ...state,
        deleteCityLoader: false,
        deleteCityStatus: true
      };
    case DELETE_CITY_FAIL:
      return {
        ...state,
        deleteCityLoader: false,
        deleteCityStatus: false
      };
    // get regions
    case GET_REGIONS:
      return { ...state, regionsLoader: true };
    case GET_REGIONS_SUCCESS:
      return {
        ...state,
        regionsLoader: false,
        regions: action.payload
      };
    case GET_REGIONS_FAIL:
      return {
        ...state,
        regionsLoader: false
      };
    default:
      return state;
  }
};
