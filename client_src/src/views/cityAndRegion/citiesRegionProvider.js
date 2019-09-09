import React from "react";

// Cities & Regions Conext
export const CitiesAndRegionsContext = React.createContext();
// states
// https://stackoverflow.com/questions/34845650/clearing-state-es6-react
const initialState = {
  city: {},
  regions: []
};
export default class RestaurantProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState }; // use spread operator to avoid mutation
  }
  render() {
    return (
      <CitiesAndRegionsContext.Provider
        value={{
          states: this.state,
          handleChange: e => this.setState({ [e.target.name]: e.target.value }),
          handleCustomFieldChange: (type, value) => this.setState({ [type]: value }),
          // Getter
          getCity: () => this.state.city,
          getRegions: () => this.state.regions,
          getCityRegions: () => ({
            city: this.state.city,
            regions: this.state.regions
          }),
          // Setter
          setCity: city => this.setState({ city: city }),
          setRegions: regions => this.setState({ regions: regions }),
          // reset that shit
          resetStates: () => {
            console.log("%c Reseting CitiesAndRegions! ", "background: #222; color: #bada55");
            this.setState(initialState, () => {
              console.log(this.state);
            });
          }
        }}
      >
        {this.props.children}
      </CitiesAndRegionsContext.Provider>
    );
  }
}
