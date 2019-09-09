import fetch from "cross-fetch";
import { toast } from "react-toastify";
// import { map as fuckingMap } from "p-iteration";
import { stringify } from "query-string";
import { getsessionPostObj } from "./commonAction";
import {
  // Get all orders regardless Customer ID
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  // get order details
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  // delete Order
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "./types";
import {
  API_BASE_URL,
  // orders
  GET_CUSTOMER_ORDERS_EP,
  GET_ORDERS_EP,
  DELETE_ORDERS_EP,
  //  relation under orders
  ORDER_DETAILS_RELATION_EP,
  // restaurants
  ApiUtils
} from "../api";

// get all Customers
export const getOrders = (silent = false) => async dispatch => {
  dispatch({ type: GET_ORDERS });

  console.log(`${API_BASE_URL}${GET_CUSTOMER_ORDERS_EP}?${stringify(await getsessionPostObj())}`);

  return fetch(`${API_BASE_URL}${GET_CUSTOMER_ORDERS_EP}?${stringify(await getsessionPostObj())}`, {
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
        type: GET_ORDERS_SUCCESS,
        payload: response
      });

      if (silent)
        toast.success("Fetched All Orders Successfully! 😎", {
          autoClose: 1500,
          hideProgressBar: true
        });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_ORDERS_FAIL });
      toast.error("Failed retrieving All Orders from Server 🤔");
    });
};
// delete exsiting order
export const deleteOrder = orderId => async dispatch => {
  dispatch({ type: DELETE_ORDER });

  return fetch(
    `${API_BASE_URL}${DELETE_ORDERS_EP}/${orderId}?${stringify(await getsessionPostObj())}`,
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
        type: DELETE_ORDER_SUCCESS,
        payload: response
      });
      dispatch(getOrders(false)); // auto refresh customer list after deleting
      toast.success("Order is Successfully Deleted! 😎", {
        autoClose: 1500,
        hideProgressBar: true
      });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: DELETE_ORDER_FAIL });
      toast.error("Failed to Delete Order from Server 🤔");
    });
};
// get single Region by id
export const getOrderDetails = orderId => async dispatch => {
  console.log(`Order details by order id = ${orderId}`);

  dispatch({ type: GET_ORDER_DETAILS });

  return fetch(
    `${API_BASE_URL}${GET_ORDERS_EP}/${orderId}/${ORDER_DETAILS_RELATION_EP}?${stringify(
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
      console.log(`Response getOrderDetails= ${JSON.stringify(response)}`);
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: response
      });
      return response;
    })
    .catch(error => {
      console.log(`Error ${error}`);
      dispatch({ type: GET_ORDER_DETAILS_FAIL });
      toast.error(`Failed to get Order Details of Order ID ${orderId} from Server 🤔`);
    });
};
