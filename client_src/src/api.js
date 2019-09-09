// bast URL
export const API_BASE_URL = "http://localhost:3000/api/";
// export const API_BASE_URL = "http://10.0.50.50:3000/api/";
// Auth
export const LOGIN_ENDPOINT = "users/login";
// Customer
export const GET_CUSTOMERS_EP = "customers";
export const DELETE_CUSTOMERS_EP = "customers";
// Orders
export const GET_CUSTOMER_ORDERS_EP = "orders/getAllOrders";
export const GET_ORDERS_EP = "orders";
export const DELETE_ORDERS_EP = "orders";
// Order details
export const ORDER_DETAILS_RELATION_EP = "orderDetails";
// categories
export const POSTEDIT_CATEGORIES_EP = "categories/addEditCategory";
export const GET_CATEGORIES_EP = "categories";
export const POST_CATEGORIES_EP = "categories";
export const PUT_CATEGORIES_EP = "categories/editCategoryWithoutImage";
export const DELETE_CATEGORY_EP = "categories";
// restaurant credentials
export const GET_RESTAURANT_CREDENTIALS_EP = "restaurantcredentials";
export const POST_RESTAURANT_CREDENTIALS_EP = "restaurantcredentials";
export const POST_RESTAURANT_CREDENTIALS_LIVE_EP = "restaurantsAdmin";
// restaurant
export const POSTEDIT_RESTAURANT_EP = "restaurants/addEditRestaurant";
export const SET_RESTAURANT_CREDENTIALS_FK_EP = "restaurants/setRestaurantCredentialsFK";
export const SET_RESTAURANT_TELEGRAM_BOT_FK_EP = "restaurants/setRestaurantTelegramBotFK";
export const GET_RESTAURANTS_EP = "restaurants";
export const POST_RESTAURANTS_EP = "restaurants";
export const PUT_RESTAURANTS_EP = "restaurants/editRestaurantWithoutLogo";
export const PUT_RESTAURANTS_LOGO_ONLY_EP = "restaurants/editRestaurantLogoOnly";
export const DELETE_RESTAURANT_EP = "restaurants";
// telegram bot
export const GET_TELEGRAM_BOT_SETTINGS_EP = "telegramBots";
export const POST_TELEGRAM_BOT_SETTINGS_EP = "telegramBots";
// cities
export const GET_CITIES_EP = "cities";
export const POST_CITIES_EP = "cities";
export const PUT_CITIES_EP = "cities";
export const DELETE_CITY_EP = "cities";
// Regions
export const GET_REGIONS_EP = "regions";
export const POST_REGIONS_EP = "regions";
export const PUT_REGIONS_EP = "regions";
export const DELETE_REGIONS_EP = "regions";

function CustomError(message, httpCode) {
  var error = Error.call(this, message);

  this.name = "CustomError";
  this.message = error.message;
  this.stack = error.stack;
  this.httpStatus = httpCode;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

// ApiUtils.js
const ApiUtils = {
  checkStatus(response) {
    if (response.ok) {
      return response;
    }
    console.log(response);
    // const error = new Error(response.statusText);
    const error = new CustomError(response.statusText, response.status);
    return error;
    // throw error;
  }
};
export { ApiUtils };
