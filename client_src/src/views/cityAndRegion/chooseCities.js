import React, { PureComponent } from "react";
import AsyncSelect from "react-select/lib/Async";
import { connect } from "react-redux";
import Loader from "react-loader";
import { Card, CardBody, InputGroup, InputGroupAddon, InputGroupText } from "shards-react";
import { getCities } from "../../actions/GeneralAction";
import { CitiesAndRegionsContext } from "./citiesRegionProvider";
// import { RestaurantContext } from "../../views/restaurant/restaurantProvider";

class AddEditRegions extends PureComponent {
  static contextType = CitiesAndRegionsContext;
  // static contextType = this.props.isFromRestraunt ? CitiesAndRegionsContext : RestaurantContext;
  constructor(props) {
    super(props);
    this.state = {
      CityObjLocal: []
    };
  }

  componentDidMount() {
    this.props.getCities(false);
  }

  // After loading saving the Category data for local use
  static getDerivedStateFromProps(nextProps, prevState) {
    // compare incoming new Props from reducer to local state
    if (Object.keys(nextProps.cities) !== Object.keys(prevState.CityObjLocal)) {
      // lets save category remote info into local state but we can't use setstate here
      return { CityObjLocal: nextProps.cities.map(opt => ({ label: opt.name, value: opt.id })) };
    } else return null; // no need localstate is FALSE already for didweAddedCategory
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevProps.CityObjLocal);
    // console.log(this.state, this.state.CityObjLocal);
    // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
    // if (prevState.CityObjLocal !== this.state.CityObjLocal) {}
  }

  filterCities = (inputValue: string) => {
    // console.log(this.state.CityObjLocal, this.state.testObj);
    return this.state.CityObjLocal.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // preparedRegions = (regions) => regions.map(opt => ({ label: opt.name, value: opt.id }));
  // console.log(`%c Prepared Regions`, "background:red;color:white");
  //  console.log(`%c ${inputValue}`, "background:red;color:white");
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterCities(inputValue));
      }, 1000);
    });

  onSelectCity = city => {
    if (
      this.props.isFromRestraunt !== undefined &&
      typeof this.props.isFromRestraunt !== "undefined"
    ) {
      this.props.restaurantContext.setCity(city);
    } else {
      this.context.setCity(city);
      // console.log(this.context);
    }
    this.props.passSelectedCity(city);
  };

  renderCity = (loader, cities) => {
    // console.log(`incoming cities, ${cities}`);
    if (!loader && Object.keys(cities).length !== 0) {
      return (
        <AsyncSelect
          isSearchable
          cacheOptions
          defaultOptions
          loadOptions={this.promiseOptions}
          onChange={this.onSelectCity}
        />
      );
    }
    return <span>loading ...</span>;
  };

  render() {
    const {
      // cities: allRegions,
      citiesLoader: loader
    } = this.props;
    const { CityObjLocal } = this.state;

    return (
      <Loader loaded={!loader}>
        <Card small className="mb-4" style={{ boxShadow: "none" }}>
          <CardBody className="p-1">
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>Choose City</InputGroupText>
              </InputGroupAddon>
              <div style={{ flex: 1 }}>{this.renderCity(loader, CityObjLocal)}</div>
            </InputGroup>
          </CardBody>
        </Card>
      </Loader>
    );
  }
}

const mapStateToProps = state => {
  return {
    // get
    citiesLoader: state.general.citiesLoader,
    cities: state.general.cities
  };
};

export default connect(
  mapStateToProps,
  {
    getCities
  }
)(AddEditRegions);
