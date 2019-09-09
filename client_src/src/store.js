//Introducing redux and thunk
import { createStore, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";

// Dev tools so that it can play nice with redux thunk
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

// redux store reducers
import allReducers from "./reducers";

// Creating store and enhancers
// eslint-disable-next-line
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const logger = createLogger({
  predicate: (getState, action) =>
    action.type !== "get_sidebar_items" &&
    action.type !== "get_categories" &&
    action.type !== "get_single_category" &&
    action.type !== "get_categories_success" &&
    action.type !== "get_single_restarant" &&
    action.type !== "get_single_restarant_success" &&
    action.type !== "get_restaurants" &&
    // action.type !== "get_restaurants_success" &&
    action.type !== "get_regions" &&
    action.type !== "get_regions_success" &&
    action.type !== "get_cities" &&
    action.type !== "get_cities_success" &&
    action.type !== "get_city_regions" &&
    action.type !== "get_single_REGIONS" &&
    action.type !== "get_single_REGIONS_success" &&
    action.type !== "get_restaurants_success" &&
    action.type !== "get_single_restarant_fail" &&
    action.type !== "get_customers" &&
    action.type !== "get_Orders" &&
    action.type !== "get_customers_success" &&
    action.type !== "get_Orders_success" &&
    action.type !== "get_restaurant_credentiall" &&
    action.type !== "get_restaurant_credentials_succes" &&
    action.type !== "get_restaurant_credentials_fail"
});

export default function ConfigureStore() {
  const store = createStore(
    allReducers,
    applyMiddleware(ReduxThunk, logger)
    // composeEnhancers(applyMiddleware(ReduxThunk))
    // applyMiddleware(ReduxThunk)
  );
  // eslint-disable-next-line
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        const newRootReducer = require("./reducers").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
}
