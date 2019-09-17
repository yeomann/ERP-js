import React from "react";
// order provider
import OrderProvider from "./OrderProvider";
import AddEditOrder from "./AddNewOrder";

const StockHandler = props => {
  let templateType = null;
  const pathName = window.location.pathname;
  if (pathName === "/add-order") {
    templateType = "add";
  } else {
    templateType = "edit";
  }

  return (
    <OrderProvider>
      <AddEditOrder
        templateType={templateType}
        history={props.history}
        routeParams={props.match.params}
      />
    </OrderProvider>
  );
};

export default StockHandler;
