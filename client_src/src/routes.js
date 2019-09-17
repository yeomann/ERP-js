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
// import Restaurants from "./views/Restaurants";
// import RestaurantHandler from "./views/restaurant/RestaurantHandler";
// import EditRestaurant from "./views/restaurant/EditRestaurant";
import Customers from "./views/customers";
import Orders from "./views/orders";
import OrderDetails from "./views/OrderDetails";
// STOCK
import StockHandler from "./views/stock/StockHandler";
import EditStock from "./views/stock/EditStock";
import Stocks from "./views/stock/Stocks";
// Order and Invocies
import OrderHandler from "./views/ordersAndInvoices/OrderHandler";
// import EditStock from "./views/ordersAndInvoices/EditStock";
import OrdersNInvoices from "./views/ordersAndInvoices/OrdersNInvoices";
// supplier-list
import SuppliersList from "./views/suppliersList/supplier-lists";
import AddEditSupplier from "./views/suppliersList/addEditSupplier";
// CustomerWithDebits
import CustomerWithDebits from "./views/customerWithDebits/customer-with-debits";
import AddEditCustomerWithDebits from "./views/customerWithDebits/addEditCustomerWithDebits";
// CustomerContactList
import CustomerContactList from "./views/customerContactsList/CustomerContactList";
import AddEditCustomerContact from "./views/customerContactsList/addCustomerContact";
// HR-system
import HRSystem from "./views/hrSystem/hrSystemList";
import AddEditHrEntery from "./views/hrSystem/addHREntery";
// other
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
  // SuppliersList
  {
    path: "/supplier-list",
    layout: DefaultLayout,
    component: SuppliersList
  },
  {
    path: "/add-supplier-list",
    layout: DefaultLayout,
    component: AddEditSupplier
  },
  {
    path: "/customer-with-debits-veresiye",
    layout: DefaultLayout,
    component: CustomerWithDebits
  },
  {
    path: "/add-customer-with-debits-veresiye",
    layout: DefaultLayout,
    component: AddEditCustomerWithDebits
  },
  // customer-contact-list
  {
    path: "/customer-contact-list",
    layout: DefaultLayout,
    component: CustomerContactList
  },
  {
    path: "/add-customer-contact-list",
    layout: DefaultLayout,
    component: AddEditCustomerContact
  },
  {
    path: "/HR-system",
    layout: DefaultLayout,
    component: HRSystem
  },
  {
    path: "/add-HR-entery",
    layout: DefaultLayout,
    component: AddEditHrEntery
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
    path: "/orders-invoices",
    layout: DefaultLayout,
    component: OrdersNInvoices
  },
  {
    path: "/add-order",
    layout: DefaultLayout,
    component: OrderHandler
  },
  {
    path: "/edit-restaurant/:id/:isEditRestaurant",
    layout: DefaultLayout,
    component: OrderHandler
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
    path: "/user-profile-erp",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
