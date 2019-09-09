import React from "react";
// restaurant provider
import RestaurantProvider from "./restaurantProvider";
import AddEditRestaurant from "./AddNewRestaurant";

const RestaurantHandler = props => {
  let templateType = null;
  const pathName = window.location.pathname;
  if (pathName === "/create-order") {
    templateType = "add";
  } else {
    templateType = "edit";
  }

  return (
    <RestaurantProvider>
      <AddEditRestaurant
        templateType={templateType}
        history={props.history}
        routeParams={props.match.params}
      />
    </RestaurantProvider>
  );
};

export default RestaurantHandler;
