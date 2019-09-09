import React from "react";
// restaurant provider
import CitiesRegionProvider from "./citiesRegionProvider";
import AddNewCityRegion from "../AddNewCityRegion";

const RestaurantHandler = props => {
  return (
    <CitiesRegionProvider>
      <AddNewCityRegion history={props.history} routeParams={props.match.params} />
    </CitiesRegionProvider>
  );
};

export default RestaurantHandler;
