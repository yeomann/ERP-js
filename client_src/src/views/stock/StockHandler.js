import React from "react";
// restaurant provider
import RestaurantProvider from "./stockProvider";
import AddEditStock from "./AddNewStock";

const StockHandler = props => {
  let templateType = null;
  const pathName = window.location.pathname;
  if (pathName === "/add-stock") {
    templateType = "add";
  } else {
    templateType = "edit";
  }

  return (
    <RestaurantProvider>
      <AddEditStock
        templateType={templateType}
        history={props.history}
        routeParams={props.match.params}
      />
    </RestaurantProvider>
  );
};

export default StockHandler;
