import React from "react";
// import { Redirect } from "react-router-dom";
import Redirect from "react-router-dom/Redirect";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import DashboardOverview from "./views/DashboardOverview";
import Errors from "./views/Errors";
import UserProfileLite from "./views/UserProfileLite";
import UserLogin from "./views/login";
import AddNewPost from "./views/AddNewPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Restaurants from "./views/Restaurants";
import RestaurantHandler from "./views/restaurant/RestaurantHandler";
// import EditRestaurant from "./views/restaurant/EditRestaurant";
import Customers from "./views/customers";
import CustomerContactList from "./views/CustomerContactList";
import Orders from "./views/orders";
import OrderDetails from "./views/OrderDetails";
// STOCK
import StockHandler from "./views/stock/StockHandler";
import EditStock from "./views/stock/EditStock";
import Stocks from "./views/stock/Stocks";

import CitiesRegions from "./views/CitiesRegions";
// import AddNewCityRegion from "./views/AddNewCityRegion";
import CitiesRegionsHandler from "./views/cityAndRegion/CitiesRegionsHandler";

export const loginRoute = {
  path: "/login",
  component: () => (
    <DefaultLayout isFull noSideBar noNavbar noFooter>
      <UserLogin />
    </DefaultLayout>
  )
};

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="erp-dashboard" />
  },
  {
    path: "/erp-dashboard",
    layout: DefaultLayout,
    component: DashboardOverview
  },
  // customer-contact-list
  {
    path: "/customer-contact-list",
    layout: DefaultLayout,
    component: CustomerContactList
  },
  // stocks
  {
    path: "/add-stock",
    layout: DefaultLayout,
    component: StockHandler
  },
  {
    path: "/stocks",
    layout: DefaultLayout,
    component: Stocks
  },
  // order
  {
    path: "/restaurants",
    layout: DefaultLayout,
    component: Restaurants
  },
  {
    path: "/create-order",
    layout: DefaultLayout,
    component: RestaurantHandler
  },
  {
    path: "/edit-restaurant/:id/:isEditRestaurant",
    layout: DefaultLayout,
    component: RestaurantHandler
  },

  {
    path: "/edit-category/:id",
    layout: DefaultLayout,
    component: EditStock
  },
  {
    path: "/citiesRegions",
    layout: DefaultLayout,
    component: CitiesRegions
  },
  {
    path: "/add-city-region",
    layout: DefaultLayout,
    component: CitiesRegionsHandler
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/customers",
    layout: DefaultLayout,
    component: Customers
  },
  {
    path: "/getAllOrders",
    layout: DefaultLayout,
    component: Orders
  },
  {
    path: "/order-details/:id",
    layout: DefaultLayout,
    component: OrderDetails
  },
  {
    path: "/user-profile-foodish",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
