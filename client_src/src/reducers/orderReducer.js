// types
import {
  // get orders
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  // delete order
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  // get order details
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL
} from "./../actions/types";

// initial states
const initialState = {
  // get orders
  ordersLoader: false,
  orders: [],
  ordersCount: 0,
  // delete customer
  deleteOrderLoader: false,
  deleteOrderStatus: false,
  // get orders
  orderDetailsLoader: false,
  orderDetails: []
};

// console.log("General Reducer is called");

// switch cases
export default (state = initialState, action) => {
  switch (action.type) {
    // get orders
    case GET_ORDERS:
      return { ...state, ordersLoader: true };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        ordersLoader: false,
        orders: action.payload,
        ordersCount: action.payload.length
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        ordersLoader: false
      };
    case DELETE_ORDER:
      return { ...state, deleteOrderLoader: true };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        deleteOrderLoader: false,
        deleteOrderStatus: true
      };
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        deleteOrderLoader: false,
        deleteOrderStatus: false
      };
    // orderDetailsLoader
    // orderDetails
    case GET_ORDER_DETAILS:
      return { ...state, orderDetailsLoader: true };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetailsLoader: false,
        orderDetails: action.payload
      };
    case GET_ORDER_DETAILS_FAIL:
      return {
        ...state,
        orderDetailsLoader: false
      };

    default:
      return state;
  }
};
