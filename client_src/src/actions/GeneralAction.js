import fetch from "cross-fetch";
import { toast } from "react-toastify";
import { map as fuckingMap } from "p-iteration";
import { stringify } from "query-string";
import { getsessionPostObj } from "./commonAction";
import {
  // get category
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  // delete category
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
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  // restaurants
  // get all restaurants
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
  CREATE_TELEGRAM_BOT_SETTINGS,
  CREATE_TELEGRAM_BOT_SETTINGS_SUCCESS,
  CREATE_TELEGRAM_BOT_SETTINGS_FAIL,
  // create/edit restauarnt
  SET_RESTAURANT,
  SET_RESTAURANT_SUCCESS,
  SET_RESTAURANT_FAIL,
  // get Single Restaurant
  GET_SINGLE_RESTAURANT,
  GET_SINGLE_RESTAURANT_SUCCESS,
  GET_SINGLE_RESTAURANT_FAIL,
  // edit single restaurant
  EDIT_SINGLE_RESTAURANT,
  EDIT_SINGLE_RESTAURANT_SUCCESS,
  EDIT_SINGLE_RESTAURANT_FAIL,
  // delete restaurant
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAIL,
  // get cities
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  // set/ create new city
  SET_CITY,
  SET_CITY_SUCCESS,
  SET_CITY_FAIL,
  // edit city
  EDIT_CITY,
  EDIT_CITY_SUCCESS,
  EDIT_CITY_FAIL,
  // Get city regions
  GET_CITIES_REGIONS,
  GET_CITIES_REGIONS_SUCCESS,
  GET_CITIES_REGIONS_FAIL,
  // delete city
  DELETE_CITY,
  DELETE_CITY_SUCCESS,
  DELETE_CITY_FAIL,
  // Regions
  GET_REGIONS,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAIL,
  // get single region
  GET_SINGLE_REGIONS,
  GET_SINGLE_REGIONS_SUCCESS,
  GET_SINGLE_REGIONS_FAIL,
  // set/create new region
  SET_REGION,
  SET_REGION_SUCCESS,
  SET_REGION_FAIL,
  // edit region
  EDIT_REGION,
  EDIT_REGION_SUCCESS,
  EDIT_REGION_FAIL,
  // delete region
  DELETE_REGION,
  DELETE_REGION_SUCCESS,
  DELETE_REGION_FAIL,
  //other
  GET_SIDEBAR_ITEMS
  // SESSION_EXPIRED_RESET_STORE
} from "./types";
import {
  API_BASE_URL,
  // customers
  GET_CUSTOMERS_EP,
  DELETE_CUSTOMERS_EP,
  // categories
  GET_CATEGORIES_EP,
  POSTEDIT_CATEGORIES_EP,
  PUT_CATEGORIES_EP,
  DELETE_CATEGORY_EP,
  // restaurant credentials
  GET_RESTAURANT_CREDENTIALS_EP,
  POST_RESTAURANT_CREDENTIALS_EP,
  POST_RESTAURANT_CREDENTIALS_LIVE_EP,
  SET_RESTAURANT_CREDENTIALS_FK_EP,
  // telegram bot settings
  GET_TELEGRAM_BOT_SETTINGS_EP,
  POST_TELEGRAM_BOT_SETTINGS_EP,
  SET_RESTAURANT_TELEGRAM_BOT_FK_EP,
  // restaurant
  POSTEDIT_RESTAURANT_EP,
  PUT_RESTAURANTS_EP,
  PUT_RESTAURANTS_LOGO_ONLY_EP,
  GET_RESTAURANTS_EP,
  DELETE_RESTAURANT_EP,
  // cties
  GET_CITIES_EP,
  POST_CITIES_EP,
  PUT_CITIES_EP,
  DELETE_CITY_EP,
  //  regions
  GET_REGIONS_EP,
  POST_REGIONS_EP,
  DELETE_REGIONS_EP,
  PUT_REGIONS_EP,
  // restaurants
  ApiUtils
} from "../api";

// import { groupBy } from "../util/index";
// import {
// // 	remoteValidateSessionID,
// // 	handleRemoteValidateResponse,
// 	getSession
// } from "./commonAction.js";
/*
 * OTHER
 */
export const getSidebarItems = () => dispatch => {
  dispatch({ type: GET_SIDEBAR_ITEMS });
};
/*
 * ##############################
 *  Customers
 * ##############################
 */

// get all Customers
export const getCustomers = (silent = false) => async dispatch => {
  dispatch({ type: GET_CUSTOMERS });

  return fetch(`${API_BASE_URL}${GET_CUSTOMERS_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getCategories= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Customer Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_CUSTOMERS_FAIL });
      toast.error("Failed retrieving Customer from Server ");
    });
};
// delete exsiting Customer
export const deleteCustomer = customerId => async dispatch => {
  dispatch({ type: DELETE_CUSTOMER });

  return fetch(
    `${API_BASE_URL}${DELETE_CUSTOMERS_EP}/${customerId}?${stringify(await getsessionPostObj())}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: DELETE_CUSTOMER_SUCCESS,
        payload: response
      });
      dispatch(getCustomers(false)); // auto refresh customer list after deleting
      toast.success("Customer is Successfully Deleted! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_CUSTOMER_FAIL });
      toast.error("Failed to Delete Customer from Server ");
    });
};

/*
 * ##############################
 *  Categories
 * ##############################
 */

// get all categories
export const getCategories = (silent = false) => async dispatch => {
  dispatch({ type: GET_CATEGORIES });
  /* if (silent)
    toast.info("Calling up API server 👨‍🏭", {
      autoClose: 1000
    }); */

  return fetch(`${API_BASE_URL}${GET_CATEGORIES_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getCategories= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Categories Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_CATEGORIES_FAIL });
      toast.error("Failed retrieving Categories from Server ");
    });
};
// delete exsiting category
export const deleteCategory = catId => async dispatch => {
  dispatch({ type: DELETE_CATEGORY });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */

  return fetch(
    `${API_BASE_URL}${DELETE_CATEGORY_EP}/${catId}?${stringify(await getsessionPostObj())}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getCategories= ${JSON.stringify(response)}`);
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: response
      });
      dispatch(getCategories(false));
      toast.success("Category is Successfully Deleted! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_CATEGORY_FAIL });
      toast.error("Failed to Delete Categories from Server ");
    });
};
// add new category
export const postCategory = (catID = 0, newCategoryInput, image) => async dispatch => {
  dispatch({ type: SET_CATEGORY });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */
  let formData = new FormData();
  if (catID !== 0) formData.append("id", catID); // if id is given, post with do EDIT/PUT
  // formData.append('id', catID === 0 ? "": catID); // if id is given, post with do EDIT/PUT
  formData.append("file", image);
  formData.append("categoryName", newCategoryInput);
  const PostDataString = formData;
  console.log(`catID ${catID}`);
  console.log(`newCategoryInput ${newCategoryInput}`);
  console.log(`image ${image}`);
  // console.log(PostDataString);
  let errorResStatus = 0;
  return (
    fetch(`${API_BASE_URL}${POSTEDIT_CATEGORIES_EP}?${stringify(await getsessionPostObj())}`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      body: PostDataString
    })
      // .then(ApiUtils.checkStatus)
      .then(response => {
        const checkResponse = ApiUtils.checkStatus(response);
        errorResStatus = checkResponse.httpStatus;
        console.log(` fetch 1st response  ${JSON.stringify(checkResponse)}`);
        return response.json();
      })
      // .then(response => response.json())
      .then(response => {
        // console.log(response.error);
        // console.log(`${typeof response}`);
        switch (errorResStatus) {
          case 422:
            dispatch({ type: SET_CATEGORY_FAIL });
            toast.error(
              `${response.error.name}\n${response.error.message}\nPlease check for Duplications.👴`
            );
            break;
          case 500:
            console.log("server error, try again");
            dispatch({ type: SET_CATEGORY_FAIL });
            toast.error("Server Error. Is your server running? 👨‍💻");
            break;
          default:
            dispatch({
              type: SET_CATEGORY_SUCCESS
            });
            // dispatch(getCategories(false)); // no more using
            toast.success("New Category has been added/Edited Successfully! ", {
              autoClose: 1500,
              hideProgressBar: true
            });
            break;
        }
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: SET_CATEGORY_FAIL });
        toast.dismiss();
        toast.error("Failed adding new Category to Server ");
      })
  );
};
// get single cat by id
export const getSingleCategory = catId => async dispatch => {
  dispatch({ type: GET_SINGLE_CATEGORY });

  return fetch(
    `${API_BASE_URL}${GET_CATEGORIES_EP}/${catId}?${stringify(await getsessionPostObj())}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response get_single_category= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_SINGLE_CATEGORY_SUCCESS,
        payload: response
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_SINGLE_CATEGORY_FAIL });
      toast.error("Failed retrieving Category from Server ");
    });
};
// edit category
export const editSingleCategoryWithoutImage = (catId, newCategoryName) => async dispatch => {
  dispatch({ type: EDIT_CATEGORY });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */

  const PostDataString = `id=${catId}&categoryName=${newCategoryName}`;
  // const PostDataString = {
  //   id: catId,
  //   categoryName: newCategoryName
  // };
  console.log(`about to query cat of id ${catId}`);
  console.log(PostDataString);
  /*   let formData = new FormData();
    formData.append('id', catId); // id to edit
    formData.append('file', newImage);
    formData.append('categoryName', newCategoryName);
    PostDataString = formData;
   */

  return fetch(`${API_BASE_URL}${PUT_CATEGORIES_EP}?${stringify(await getsessionPostObj())}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // body: JSON.stringify(PostDataString)
    body: PostDataString
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      // console.log(`${typeof response}`);
      dispatch({
        type: EDIT_CATEGORY_SUCCESS
      });
      // dispatch(getCategories(false)); // no using anymore
      toast.success("Category has been edited Successfully! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: EDIT_CATEGORY_FAIL });
      toast.dismiss();
      toast.error("Failed editing Category from Server ");
    });
};

/*
 * ##############################
 *  Restaurant
 * ##############################
 */
// get all Restaurants
export const getRestaurants = (silent = false) => async dispatch => {
  dispatch({ type: GET_RESTAURANTS });
  /*if (silent)
     toast.info("Calling up API server 👨‍🏭", {
      autoClose: 1000
    }); */
  console.log(`${API_BASE_URL}${GET_RESTAURANTS_EP}?${stringify(await getsessionPostObj())}`);
  return fetch(`${API_BASE_URL}${GET_RESTAURANTS_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getRestaurants= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_RESTAURANTS_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Restaurants Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_RESTAURANTS_FAIL });
      toast.error("Failed retrieving Restaurants from Server ");
    });
};
// get restaurant credentials
export const getRestaurantCredentials = (silent = false) => async dispatch => {
  dispatch({ type: GET_RESTAURANT_CREDENTIALL });
  /*if (silent)
     toast.info("Calling up API server 👨‍🏭", {
      autoClose: 1000
    }); */
  console.log(
    `${API_BASE_URL}${GET_RESTAURANT_CREDENTIALS_EP}?${stringify(await getsessionPostObj())}`
  );
  return fetch(
    `${API_BASE_URL}${GET_RESTAURANT_CREDENTIALS_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getRestaurants= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_RESTAURANT_CREDENTIALS_SUCCES,
        payload: response
      });

      if (silent)
        toast.success("Fetched Restaurant Credentials Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_RESTAURANT_CREDENTIALS_FAIL });
      toast.error("Failed retrieving Restaurant Credentials from Server ");
    });
};
/*
 * Create real login for restaurant
 */
export const createRestaurantCredentialsLive = (
  restId,
  username,
  password,
  email,
  restaurantcredentialIdFk,
  silent = false
) => async dispatch => {
  dispatch({ type: CREATE_RESTAURANT_CREDENTIAL_LIVE });

  console.log(
    `${API_BASE_URL}${POST_RESTAURANT_CREDENTIALS_LIVE_EP}?${stringify(await getsessionPostObj())}`
  );
  const URL = `${API_BASE_URL}${POST_RESTAURANT_CREDENTIALS_LIVE_EP}?${stringify(
    await getsessionPostObj()
  )}`;
  const PostDataString = `username=${username}&restrauantId=${restId}&email=${email}&password=${password}&restaurantcredentialIdFk=${restaurantcredentialIdFk}`;
  console.log(PostDataString);

  return fetch(URL, {
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
      // console.log(`Response getRestaurants= ${JSON.stringify(response)}`);
      dispatch({
        type: CREATE_RESTAURANT_CREDENTIALS_SUCCES_LIVE,
        payload: response
      });

      if (silent) {
        toast.success("Created Restaurant Credentials Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
      }
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: CREATE_RESTAURANT_CREDENTIALS_FAIL_LIVE });
      toast.error("Failed retrieving Restaurant Credentials from Server ");
    });
};

export const setRestaurantCredentialsForignKey = (restId, credentialsId) => async dispatch => {
  dispatch({ type: "SET_RESTAURANT_CREDENTIAL_ID_START" });
  // SET_RESTAURANT_CREDENTIALS_FK_EP
  const PostDataString = `id=${restId}&credentialsID=${credentialsId}`;
  console.log(`about to edit restaurant of id ${restId}`);
  console.log(PostDataString);

  return fetch(
    `${API_BASE_URL}${SET_RESTAURANT_CREDENTIALS_FK_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch({ type: "SET_RESTAURANT_CREDENTIAL_ID_SUCCESS" });

      dispatch(getRestaurantCredentials(false));
      dispatch(getRestaurants(false));
      alert("Restaurant Credential ID has been added Successfully!");

      // toast.success("Restaurant Credential ID has been added Successfully!", {
      //   autoClose: 1500,
      //   hideProgressBar: true
      // });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: "SET_RESTAURANT_CREDENTIAL_ID_FAIL" });
      toast.dismiss();
      toast.error("Failed adding Credential ID of Restaurant from Server ");
    });
};

// create restaurant credentials
export const createRestaurantCredentials = (
  restId,
  username,
  password,
  email,
  silent = false
) => async dispatch => {
  dispatch({ type: CREATE_RESTAURANT_CREDENTIAL });

  console.log(
    `${API_BASE_URL}${POST_RESTAURANT_CREDENTIALS_EP}?${stringify(await getsessionPostObj())}`
  );
  const URL = `${API_BASE_URL}${POST_RESTAURANT_CREDENTIALS_EP}?${stringify(
    await getsessionPostObj()
  )}`;
  const PostDataString = `username=${username}&restrauantId=${restId}&email=${email}&password=${password}`;

  return fetch(URL, {
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
      console.log(`Response createRestaurantCredentials= ${JSON.stringify(response)}`);
      dispatch({
        type: CREATE_RESTAURANT_CREDENTIALS_SUCCES,
        payload: response
      });
      // refresh all credentials state
      // dispatch(getRestaurantCredentials());
      dispatch(createRestaurantCredentialsLive(restId, username, password, email, response.id));
      dispatch(setRestaurantCredentialsForignKey(restId, response.id));
      // if (silent) {
      //   toast.success("Created Restaurant Credentials Successfully! ", {
      //     autoClose: 1500,
      //     hideProgressBar: true
      //   });
      // }
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: CREATE_RESTAURANT_CREDENTIALS_FAIL });
      toast.error("Failed Creating Restaurant Credentials from Server ");
    });
};
/*
 * Telegram Bots Settings
 */
// get telegram bot's settings
export const getTelegramBotSettings = (silent = false) => async dispatch => {
  dispatch({ type: GET_TELEGRAM_BOT_SETTINGS });
  console.log(
    `${API_BASE_URL}${GET_TELEGRAM_BOT_SETTINGS_EP}?${stringify(await getsessionPostObj())}`
  );
  return fetch(
    `${API_BASE_URL}${GET_TELEGRAM_BOT_SETTINGS_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getRestaurants= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_TELEGRAM_BOT_SETTINGS_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Telegram Bots Settings Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_TELEGRAM_BOT_SETTINGS_FAIL });
      toast.error("Failed retrieving Telegram Bots Settings from Server ");
    });
};
// set Restaurant Telegram Bot Forign Key
export const setRestaurantTelegramBotForignKey = (restId, responseId) => async dispatch => {
  dispatch({ type: "SET_RESTAURANT_TELEGRAM_BOT_ID_START" });
  const PostDataString = `id=${restId}&telegramBotObjectID=${responseId}`;
  console.log(`about to edit restaurant of id ${restId}`);
  console.log(PostDataString);

  return fetch(
    `${API_BASE_URL}${SET_RESTAURANT_TELEGRAM_BOT_FK_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch({ type: "SET_RESTAURANT_TELEGRAM_BOT_ID_SUCCESS" });

      dispatch(getTelegramBotSettings(false));
      dispatch(getRestaurants(false));
      alert("Telegram bot settings ID has been added Successfully to Restaurant!");

      // toast.success("Restaurant Credential ID has been added Successfully!", {
      //   autoClose: 1500,
      //   hideProgressBar: true
      // });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: "SET_RESTAURANT_TELEGRAM_BOT_ID_FAIL" });
      toast.dismiss();
      toast.error("Failed setting telegram bot ID in Restaurant model from Server ");
    });
};
// create telegram bot settings
export const createTelegramBotSettings = (telegramBotObj, silent = false) => async dispatch => {
  dispatch({ type: CREATE_TELEGRAM_BOT_SETTINGS });

  const PostDataString = `botName=${telegramBotObj.botName}&botToken=${
    telegramBotObj.botToken
  }&chatsId=${JSON.stringify(telegramBotObj.chatIds)}&restrauantId=${telegramBotObj.restId}`;

  console.log(
    `${API_BASE_URL}${POST_TELEGRAM_BOT_SETTINGS_EP}?${stringify(await getsessionPostObj())}`
  );

  return fetch(
    `${API_BASE_URL}${POST_TELEGRAM_BOT_SETTINGS_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getRestaurants= ${JSON.stringify(response)}`);
      dispatch({
        type: CREATE_TELEGRAM_BOT_SETTINGS_SUCCESS,
        payload: response
      });
      // set response id as FK in restaurant model
      dispatch(setRestaurantTelegramBotForignKey(telegramBotObj.restId, response.id));

      if (silent)
        toast.success("Saved Telegram Bots Settings Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: CREATE_TELEGRAM_BOT_SETTINGS_FAIL });
      toast.error("Failed saving Telegram Bots Settings to Server");
    });
};

// add new restaurant
export const postRestaurant = (
  restID = 0,
  logo,
  restaurantData,
  menuData,
  cityAndRegion
) => async dispatch => {
  dispatch({ type: SET_RESTAURANT });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */
  // console.log(`restID ${restID}`);

  let formData = new FormData();
  if (restID !== 0) formData.append("id", restID); // if id is given, post with do EDIT/PUT
  formData.append("file", logo);
  formData.append("restaurantData", JSON.stringify(restaurantData));
  formData.append("menuData", JSON.stringify(menuData));
  formData.append("cityAndRegion", JSON.stringify(cityAndRegion));

  const PostDataString = formData;
  // console.log(PostDataString);
  let errorResStatus = 0;
  console.log(`${API_BASE_URL}${POSTEDIT_RESTAURANT_EP}?${stringify(await getsessionPostObj())}`);
  return (
    fetch(`${API_BASE_URL}${POSTEDIT_RESTAURANT_EP}?${stringify(await getsessionPostObj())}`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      body: PostDataString
    })
      // .then(ApiUtils.checkStatus)
      .then(response => {
        const checkResponse = ApiUtils.checkStatus(response);
        errorResStatus = checkResponse.httpStatus;
        // console.log(` fetch 1st response  ${JSON.stringify(checkResponse)}`);
        return response.json();
      })
      // .then(response => response.json())
      .then(response => {
        // console.log(response.error);
        // console.log(`${typeof response}`);
        switch (errorResStatus) {
          case 422:
            dispatch({ type: SET_RESTAURANT_FAIL });
            toast.error(
              `${response.error.name}\n${response.error.message}\nPlease check for Duplications.👴`
            );
            break;
          case 500:
            console.log("server error, try again");
            dispatch({ type: SET_RESTAURANT_FAIL });
            toast.error("Server Error. Is your server running? 👨‍💻");
            break;
          default:
            dispatch({
              type: SET_RESTAURANT_SUCCESS
            });
            // console.log(response);
            // dispatch(getCategories(false)); // no more using
            toast.success("New Restaurant has been added/Edited Successfully! ", {
              autoClose: 1500,
              hideProgressBar: true
            });
            break;
        }
      })
      .catch(error => {
        console.log(`Error ${error}`);
        dispatch({ type: SET_RESTAURANT_FAIL });
        toast.dismiss();
        toast.error("Failed adding new Restaurant to Server ");
      })
  );
};

// edit restaurant without logo
export const editRestaurantWithoutLogo = (restId, restaurantData, menuData) => async dispatch => {
  dispatch({ type: EDIT_SINGLE_RESTAURANT });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */

  // console.log(restaurantData);
  // console.log(menuData);

  const PostDataString = `id=${restId}&restaurantData=${JSON.stringify(
    restaurantData
  )}&menuData=${JSON.stringify(menuData)}`;
  console.log(`about to edit restaurant of id ${restId}`);
  console.log(PostDataString);

  return fetch(`${API_BASE_URL}${PUT_RESTAURANTS_EP}?${stringify(await getsessionPostObj())}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: PostDataString
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      // console.log(`${typeof response}`);
      dispatch({
        type: EDIT_SINGLE_RESTAURANT_SUCCESS
      });
      toast.success("Restaurant info has been edited Successfully! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: EDIT_SINGLE_RESTAURANT_FAIL });
      toast.dismiss();
      toast.error("Failed editing Restaurant from Server ");
    });
};

// edit restaurant LOGO only
export const editRestaurantLogoOnly = (restId, logoFile) => async dispatch => {
  dispatch({ type: EDIT_SINGLE_RESTAURANT });

  // const PostDataString = `id=${restId}&logoFile=${JSON.stringify(logoFile)}`;
  let formData = new FormData();
  formData.append("id", restId); // if id is given, post with do EDIT/PUT
  formData.append("logoFile", logoFile);

  const PostDataString = formData;

  console.log(`about to edit LOGO of restaurant id: ${restId}`);
  // console.log(PostDataString);
  return fetch(
    `${API_BASE_URL}${PUT_RESTAURANTS_LOGO_ONLY_EP}?${stringify(await getsessionPostObj())}`,
    {
      method: "POST",
      // method: "PUT",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      console.log("EDIT_SINGLE_RESTAURANT_SUCCESS");
      console.log(response);
      console.log(`${typeof response}`);
      dispatch({
        type: EDIT_SINGLE_RESTAURANT_SUCCESS
      });
      toast.success("Restaurant info has been edited Successfully! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: EDIT_SINGLE_RESTAURANT_FAIL });
      toast.dismiss();
      toast.error("Failed editing Restaurant from Server ");
    });
};

// delete exsiting Restaurant
export const deleteRestaurant = restId => async dispatch => {
  dispatch({ type: DELETE_RESTAURANT });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */

  return fetch(
    `${API_BASE_URL}${DELETE_RESTAURANT_EP}/${restId}?${stringify(await getsessionPostObj())}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response deleteRestaurant= ${JSON.stringify(response)}`);
      dispatch({
        type: DELETE_RESTAURANT_SUCCESS,
        payload: response
      });
      dispatch(getRestaurants(false));
      toast.success("Restaurant is Successfully Deleted! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_RESTAURANT_FAIL });
      toast.error("Failed to Delete Restaurant from Server ");
    });
};
// get single cat by id
export const getSingleRestaurant = restId => async dispatch => {
  dispatch({ type: GET_SINGLE_RESTAURANT });

  return fetch(
    `${API_BASE_URL}${GET_RESTAURANTS_EP}/${restId}?${stringify(await getsessionPostObj())}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response get_single_Restaurant= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_SINGLE_RESTAURANT_SUCCESS,
        payload: response
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_SINGLE_RESTAURANT_FAIL });
      toast.error("Failed retrieving Restaurant info from Server ");
    });
};
// Rest calling solely for the "edit purpose"
// whenever there's a previous single restaruant data is loaded inside, it doesn't get free
// therefore i think i need to reset that shit, wtf?!
export const resetReduxRestaurantSingleState = () => async dispatch => {
  dispatch({ type: GET_SINGLE_RESTAURANT_FAIL });
};
//
/*
 * ##############################
 *  Cities
 * ##############################
 */
// get all cities
export const getCities = (silent = false) => async dispatch => {
  dispatch({ type: GET_CITIES });
  /* if (silent)
    toast.info("Calling up API server 👨‍🏭", {
      autoClose: 1000
    }); */

  return fetch(`${API_BASE_URL}${GET_CITIES_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getCategories= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_CITIES_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Cities Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_CITIES_FAIL });
      toast.error("Failed retrieving Cities from Server ");
    });
};
// get all cities and Regions
export const getCitiesRegions = (silent = false) => async dispatch => {
  dispatch({ type: GET_CITIES_REGIONS });
  // return fetch(`${API_BASE_URL}${GET_CITIES_EP}/${CityID}/${GET_REGIONS_EP}`, {
  return fetch(`${API_BASE_URL}${GET_CITIES_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      let CitiesNames = new Map();
      const CitiesIds = response.map(city => {
        CitiesNames.set(city.id, city.name);
        return city.id;
      });
      const prepareCityAndRegions = fuckingMap(CitiesIds, async cityId => {
        return fetch(
          `${API_BASE_URL}${GET_CITIES_EP}/${cityId}/${GET_REGIONS_EP}?${stringify(
            await getsessionPostObj()
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
          .then(response => response.json())
          .then(response => {
            return {
              name: CitiesNames.get(cityId),
              id: cityId,
              regions: response
            };
          })
          .catch(error => {
            console.log(`ERROR ${error}`);
          });
      });

      prepareCityAndRegions.then(items => {
        console.log(items);
        dispatch({
          type: GET_CITIES_REGIONS_SUCCESS,
          payload: items
        });
      });

      if (silent)
        toast.success("Fetched Cities Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_CITIES_REGIONS_FAIL });
      toast.error("Failed retrieving Cities from Server ");
    });
};
// create/post new City
export const postCity = newCityName => async dispatch => {
  dispatch({ type: SET_CITY });
  const PostDataString = `name=${newCityName}`;
  return fetch(`${API_BASE_URL}${POST_CITIES_EP}?${stringify(await getsessionPostObj())}`, {
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
      dispatch({
        type: SET_CITY_SUCCESS
      });
      // Re-calling to get cities.
      dispatch(getCities(false));
      toast.success("New City has been added Successfully! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: SET_CITY_FAIL });
      toast.dismiss();
      toast.error("Failed adding new City to Server ");
    });
};
// edit city
export const editCity = (cityId, newInput) => async dispatch => {
  console.log(`EDIT City by id = ${cityId}`);
  const PostDataString = `name=${newInput}&id=${cityId}`;

  dispatch({ type: EDIT_CITY });

  return fetch(
    `${API_BASE_URL}${PUT_CITIES_EP}/${cityId}?${stringify(await getsessionPostObj())}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response editCity= ${JSON.stringify(response)}`);
      dispatch({
        type: EDIT_CITY_SUCCESS,
        payload: response
      });
      dispatch(getCitiesRegions(false)); // refresh that shit
      toast.success("Edit was Successful ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: EDIT_CITY_FAIL });
      toast.error("Failed editing city from Server ");
    });
};
// delete exsiting cities
export const deleteCities = id => async dispatch => {
  dispatch({ type: DELETE_CITY });
  /* toast.info("Calling up API server 👨‍🏭", {
    autoClose: 1000
  }); */

  return fetch(`${API_BASE_URL}${DELETE_CITY_EP}/${id}?${stringify(await getsessionPostObj())}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response deleteCities= ${JSON.stringify(response)}`);
      dispatch({
        type: DELETE_CITY_SUCCESS,
        payload: response
      });
      dispatch(getCitiesRegions(false));
      toast.success("City is Successfully Deleted! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_CITY_FAIL });
      toast.error("Failed to Delete City from Server ");
    });
};
/*
 * ##############################
 *  Regions
 * ##############################
 */
// get all Regions
export const getRegions = (silent = false) => async dispatch => {
  dispatch({ type: GET_REGIONS });
  /* if (silent)
    toast.info("Calling up API server 👨‍🏭", {
      autoClose: 1000
    }); */

  return fetch(`${API_BASE_URL}${GET_REGIONS_EP}?${stringify(await getsessionPostObj())}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getCategories= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_REGIONS_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched Cities Successfully! ", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_REGIONS_FAIL });
      toast.error("Failed retrieving Cities from Server ");
    });
};
// create/post new Region
export const postRegion = (cityID, newRegionName) => async dispatch => {
  dispatch({ type: SET_REGION });
  const PostDataString = `cityIdFK=${cityID}&name=${newRegionName}`;
  return fetch(`${API_BASE_URL}${POST_REGIONS_EP}?${stringify(await getsessionPostObj())}`, {
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
      dispatch({
        type: SET_REGION_SUCCESS
      });
      // refresh that particular regions by ID
      // dispatch(getSingleRegion(cityID)); // TODO: fix this, doing in client side without redux atm
      toast.success("New Region has been added Successfully! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: SET_REGION_FAIL });
      toast.dismiss();
      toast.error("Failed adding new Region to Server ");
    });
};
// get single Region by id
export const getSingleRegion = cityId => async dispatch => {
  // console.log(`get regions by id = ${cityId}`);

  dispatch({ type: GET_SINGLE_REGIONS });

  return fetch(
    `${API_BASE_URL}${GET_CITIES_EP}/${cityId}/${GET_REGIONS_EP}?${stringify(
      await getsessionPostObj()
    )}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response getSingleRegion= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_SINGLE_REGIONS_SUCCESS,
        payload: response
      });
      return response;
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_SINGLE_REGIONS_FAIL });
      toast.error("Failed Single Region from Server ");
    });
};
// edit region by id
export const editRegion = (cityId, regionId, inputNodeVal) => async dispatch => {
  // console.log(`EDIT regions by id = ${cityId}, regionId=${regionId}, inputNodeVal=${inputNodeVal}`);
  const PostDataString = `cityIdFK=${cityId}&name=${inputNodeVal}&id=${regionId}`;

  dispatch({ type: EDIT_REGION });

  return fetch(
    `${API_BASE_URL}${PUT_REGIONS_EP}/${regionId}?${stringify(await getsessionPostObj())}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: PostDataString
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response editRegion= ${JSON.stringify(response)}`);
      dispatch({
        type: EDIT_REGION_SUCCESS,
        payload: response
      });
      toast.success("Edit was Successful ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: EDIT_REGION_FAIL });
      toast.error("Failed Single Region from Server ");
    });
};
// delete exsiting Region
export const deleteRegion = id => async dispatch => {
  dispatch({ type: DELETE_REGION });

  return fetch(
    `${API_BASE_URL}${DELETE_REGIONS_EP}/${id}?${stringify(await getsessionPostObj())}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      // console.log(`Response deleteRegion= ${JSON.stringify(response)}`);
      dispatch({
        type: DELETE_REGION_SUCCESS,
        payload: response
      });
      // dispatch(getCitiesRegions(false)); // TODO:// same like above postRegion() doing in clint side
      toast.success("Region is Successfully Deleted! ", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_REGION_FAIL });
      toast.error("Failed to Delete Region from Server ");
    });
};
/*
 * ##############################
 *  Others
 * ##############################
 */

/**
 * @desc  Orchestrating Call For getting getFamilyFilterStatus
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the getFamilyFilterStatus()
 *  @see {getFamilyFilterStatus()}
 * @return {Promise<Resolve, Reject>}
 */
/*
export const getFamilyFilterStatusV2 = selectedAccount => async dispatch => {
	console.log(`getFamilyFilterStatusV2 is being called`);
	dispatch({ type: SESSION_CHECK_START });

	const KeyChainSessionStr = await getSessionFromKeychain();
	const ValidateResponse = await remoteValidateSessionID(KeyChainSessionStr);

	if (ValidateResponse) {
		dispatch({ type: SESSION_IS_VALID });
		dispatch({ type: GET_FAMILY_FILTER });
		handleRemoteValidateResponse(ValidateResponse);
		await dispatch(
			getFamilyFilterStatus(KeyChainSessionStr, selectedAccount)
		).then(
			status => {
				console.log(status);
				dispatch({ type: GET_FAMILY_FILTER_FINISHED });
			},
			error => {
				console.log(error);
				dispatch({ type: "GET_FAMILY_FILTER_FINISHED_WITH_ERROR" });
			}
		);
	} else {
		dispatch({ type: SESSION_EXPIRED });
	}
};
*/
/*
 * @summary Family filter request
 */
/*
export const getFamilyFilterStatus = (sessionID, selectedAccount) => dispatch =>
	new Promise((resolve, reject) => {
		console.log(
			`getFamilyFilterStatus calling ${API_BASE_URL}${GET_FAMILY_FILTER_STATUS_ENDPOINT}`
		);
		const PostDataString = `session_id=${sessionID}&s_username=${selectedAccount}&b_debug=1`;
		console.log(PostDataString);
		return fetch(`${API_BASE_URL}${GET_FAMILY_FILTER_STATUS_ENDPOINT}`, {
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
				console.log(response);
				console.log(
					`Response FamilyFilterStatus= ${JSON.stringify(response)}`
				);
				if (Number(response.i_result) === 1) {
					dispatch({
						type: GET_FAMILY_FILTER_SUCCESS,
						payload: response.a_data.a_services.a_data
					});
					resolve(response);
					return true;
				}
				dispatch({
					type: GET_FAMILY_FILTER_FAIL
				});
				reject(response);
				return false;
			})
			.catch(error => {
				reject(error);
				console.log(`Error ${error}`);
				dispatch({ type: GET_FAMILY_FILTER_FAIL });
				return false;
			});
	});
*/
